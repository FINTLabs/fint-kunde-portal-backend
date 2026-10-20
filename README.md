# Fint Kundeportal #

This is the back-end project for the customer portal.

[Kundeportal](https://kunde.felleskomponent.no/)

## How to run local 

1. Start vpn against azure
2. Connect to jump server: `ssh -L 3890:vm-edir01.management.private:389 fint@10.10.10.4`
3. Add environment variables from the secret **Kundeportalen env.** in 1Password 
4. Add x-nin to environment variables
5. Set active profiles to test

## New routing configuration

* kunde.felleskomponent.no/ -> fint-kunde-portal-frontend
* kunde.felleskomponent.no/api -> fint-kunde-portal-backend
* kunde.felleskomponent.no/test-runner -> fint-test-runner
* kunde.felleskomponent.no/link-walker -> fint-link-walker
* kunde.felleskomponent.no/consent-admin -> fint-samtykke-admin-backend
* kunde.felleskomponent.no/zendesk-integration -> fint-zendesk-integration

## CI/CD

Branches map to environments the same way as in fint-core:

| Branch | Environment | Cluster |
|---|---|---|
| `develop` | beta | `aks-beta-fint-2021-11-23` |
| `main` | api (production) | `aks-api-fint-2022-02-08` |

`main` only takes pull requests, so the normal flow is: branch off `develop`,
PR into `develop` (deploys to beta), then PR `develop` into `main` (deploys to api).

### CI (`.github/workflows/CI.yaml`)

Runs on pull requests and on pushes to `main`/`develop`. It is path-filtered:
`./gradlew check` only runs when something under the paths listed in
`.github/scripts/paths.sh` changed (`src`, the Gradle files, the `Dockerfile`).
`ci-ok` is a single gate that is green when nothing failed (a skipped check
counts as ok), so use it as the required status check.

### CD (`.github/workflows/CD.yaml`)

Runs on pushes to `main` and `develop`.

1. **setup** maps the branch to an environment and resolves the app version:
   the short sha of the last commit that touched the application paths.
2. **build** checks whether `ghcr.io/fintlabs/fint-kunde-portal-backend:sha-<version>`
   already exists in GHCR. If it does, the build is skipped. A push that only
   changes kustomize, workflows or docs therefore never rebuilds the image.
3. **deploy** renders `kustomize/overlays/<env>`, swaps in the image tag, logs
   into Azure with `AKS_<ENV>_FINT_GITHUB`, and applies the FLAIS `Application`
   to namespace `fintlabs-no`.

### Feature flags

`feature.flags.*` are set as env on the Application in `kustomize/base/flais.yaml`
and read by `FeatureProperties.kt`. A flag that is not set is enabled.

| Flag | Guards |
|---|---|
| `feature.flags.oauth-credentials-create` | `POST /api/clients/...` and `POST /api/adapters/...` |
| `feature.flags.oauth-credentials-delete` | `DELETE /api/clients/...` and `DELETE /api/adapters/...` |

A disabled flag makes the endpoint answer `405 Method Not Allowed`.
