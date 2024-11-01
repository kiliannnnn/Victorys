# Use the latest lightweight Alpine Linux as a base image
FROM alpine:latest

# Set PocketBase version as an argument for easy version updates
ARG PB_VERSION=0.22.22

# Install necessary packages: unzip for extracting the PocketBase binary,
# ca-certificates for HTTPS connections, and openssh if you need scp to copy data locally
RUN apk add --no-cache \
    unzip \
    ca-certificates \
    openssh

# Download and unzip PocketBase
ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/ \
    && rm /tmp/pb.zip

# Set up a directory for persistent data storage
RUN mkdir -p /pb_data

# Optionally copy local migration and hook directories into the container
# Uncomment these if you have local directories you'd like to include
# COPY ./pb_migrations /pb/pb_migrations
# COPY ./pb_hooks /pb/pb_hooks

# Expose PocketBase's default port
EXPOSE 8080

# Set up the default command to start PocketBase with binding to all interfaces
CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8080", "--dir", "/pb_data"]
