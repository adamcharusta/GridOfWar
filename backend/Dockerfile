# syntax=docker/dockerfile:1.7

############################
# Build stage
############################
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copy build configuration first for layer caching
COPY global.json Directory.Build.props Directory.Packages.props GridOfWar.slnx ./

# Copy only csproj files to maximize NuGet restore cache hits
COPY src/GridOfWar.Domain/GridOfWar.Domain.csproj            src/GridOfWar.Domain/
COPY src/GridOfWar.Application/GridOfWar.Application.csproj  src/GridOfWar.Application/
COPY src/GridOfWar.Infrastructure/GridOfWar.Infrastructure.csproj src/GridOfWar.Infrastructure/
COPY src/GridOfWar.Api/GridOfWar.Api.csproj                  src/GridOfWar.Api/

RUN dotnet restore src/GridOfWar.Api/GridOfWar.Api.csproj

# Copy the rest of the source and publish
COPY src/ src/

RUN dotnet publish src/GridOfWar.Api/GridOfWar.Api.csproj \
    --configuration Release \
    --no-restore \
    --output /app/publish

############################
# Runtime stage
############################
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app

# Run as non-root user (provided by the base image)
USER $APP_UID

COPY --from=build /app/publish ./

EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080 \
    ASPNETCORE_ENVIRONMENT=Production \
    DOTNET_RUNNING_IN_CONTAINER=true \
    DOTNET_GENERATE_ASPNET_CERTIFICATE=false

ENTRYPOINT ["dotnet", "GridOfWar.Backend.Api.dll"]
