let
  pkgs = import (builtins.fetchTarball {
    name = "nixos-unstable-2021-10-01";
    url = "https://github.com/nixos/nixpkgs/archive/82155ff501c7622cb2336646bb62f7624261f6d7.tar.gz";
    sha256 = "0xv47cpgaxb4j46ggjx9gkg299m9cdfzar27xw5h5k2lg5d3dljg";
  }) { };

  local-node = pkgs.writeShellScriptBin "local-node" ''
    hardhat node
  '';

  local-fork = pkgs.writeShellScriptBin "local-fork" ''
    hardhat node --fork https://eth-mainnet.alchemyapi.io/v2/G0Vg_iZFiAuUD6hjXqcVg-Nys-NGiTQy --fork-block-number 11833335
  '';

  local-test = pkgs.writeShellScriptBin "local-test" ''
    hardhat test --network localhost
  '';

  local-deploy = pkgs.writeShellScriptBin "local-deploy" ''
    hardhat run --network localhost scripts/deploy.ts
  '';

  prettier-check = pkgs.writeShellScriptBin "prettier-check" ''
    prettier --check .
  '';

  prettier-write = pkgs.writeShellScriptBin "prettier-write" ''
    prettier --write .
  '';

  ci-lint = pkgs.writeShellScriptBin "ci-lint" ''
    solhint 'contracts/**/*.sol'
    prettier-check
  '';

  security-check = pkgs.writeShellScriptBin "security-check" ''
    # Run slither against all our contracts.
    # Disable npx as nix-shell already handles availability of what we need.
    # Dependencies and tests are out of scope.
    slither . --npx-disable --filter-paths="contracts/test" --exclude-dependencies
  '';

  cut-dist = pkgs.writeShellScriptBin "cut-dist" ''
      rm -rf artifacts
      rm -rf cache
      rm -rf node_modules
      rm -rf typechain
      npm install
      hardhat compile --force
      dir=`git rev-parse HEAD`
      mkdir -p ''${dir}
      mv artifacts "dist/''${dir}/"
      mv typechain "dist/''${dir}/"
      # solt write contracts --npm --runs 100000
  '';

  ci-test = pkgs.writeShellScriptBin "ci-test" ''
    hardhat test
  '';

  docgen = pkgs.writeShellScriptBin "docgen" ''
    rm -rf docs/api && npm run docgen
  '';

  docs-dev = pkgs.writeShellScriptBin "docs-dev" ''
    docgen && npm run start --prefix docusaurus
  '';

  docs-build = pkgs.writeShellScriptBin "docs-build" ''
    docgen && npm run build --prefix docusaurus
  '';

  docs-serve = pkgs.writeShellScriptBin "docs-serve" ''
    npm run serve --prefix docusaurus
  '';

  docs-version = pkgs.writeShellScriptBin "docs-version" ''
    docs-build && npm run docusaurus --prefix docusaurus docs:version ''${GIT_TAG}
  '';

  prepack = pkgs.writeShellScriptBin "prepack" ''
    set -euo pipefail
    shopt -s globstar

    npm run build

    mkdir -p dist/v6 && cp -rf artifacts/ dist/v6

    cp artifacts/contracts/**/*.json artifacts
    rm -rf artifacts/*.dbg.json
    rm -rf artifacts/*Test*
    rm -rf artifacts/*Reentrant*
    rm -rf artifacts/*ForceSendEther*
    rm -rf artifacts/*Mock*

    rm -rf typechain/**/*Test*
    rm -rf typechain/**/*Reentrant*
    rm -rf typechain/**/*ForceSendEther*
    rm -rf typechain/**/*Mock*
  '';

  prepublish = pkgs.writeShellScriptBin "prepublish" ''
    npm version patch --no-git-tag-version
    PACKAGE_NAME=$(node -p "require('./package.json').name")
    PACKAGE_VERSION=$(node -p "require('./package.json').version")
    cat << EOF


    Package version for $PACKAGE_NAME bumped to $PACKAGE_VERSION

    Please manually commit this change, and push up to the GitHub repo:

    $ git commit -am "$PACKAGE_VERSION"
    $ git push

    Now, you should either:
    - tag this commit locally and push it up
    - remotely cut a release on the GitHub repo (if you're having issues tagging the commit locally)

    Locally:
    $ git tag v$PACKAGE_VERSION -am "$PACKAGE_VERSION"
    $ git push origin v$PACKAGE_VERSION

    Remotely:
    Go to Releases -> Draft a new release
    Select this branch and create a new release with the following tag: v$PACKAGE_VERSION


    EOF
  '';
in
pkgs.stdenv.mkDerivation {
  name = "shell";
  buildInputs = [
    pkgs.nixpkgs-fmt
    pkgs.nodejs-14_x
    pkgs.python310
    pkgs.slither-analyzer
    local-node
    local-fork
    local-test
    local-deploy
    prettier-check
    prettier-write
    security-check
    ci-test
    ci-lint
    cut-dist
    docgen
    docs-dev
    docs-build
    docs-serve
    docs-version
    prepack
    prepublish
  ];

  shellHook = ''
    export PATH=$( npm bin ):$PATH
    # keep it fresh
    npm install
    npm install --prefix docusaurus
  '';
}
