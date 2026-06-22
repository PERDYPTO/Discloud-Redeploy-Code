name: Deploy to Discloud (Manual CLI)

on:
  workflow_dispatch:

permissions:
  contents: read

jobs:
  deploy:
    runs-on: ubuntu-latest
    env:
      DISCLOUD_TOKEN: ${{ secrets.DISCLOUD_TOKEN }}

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Install discloud-cli
        run: npm install -g discloud-cli

      - name: Write .env to RAM disk
        run: |
          cat > /dev/shm/.env <<EOF
          DISCORD_TOKEN=${{ secrets.DISCORD_TOKEN }}
          DISCORD_CLIENT_ID=${{ secrets.DISCORD_CLIENT_ID }}
          HF_TOKEN=${{ secrets.HF_TOKEN }}
          HF_BUCKET_NAME=${{ secrets.HF_BUCKET_NAME }}
          SERVICES_URL=${{ secrets.SERVICES_URL }}
          API_SECRET=${{ secrets.API_SECRET }}
          EOF

      - name: Copy project to staging dir (exclude .github)
        run: |
          mkdir /tmp/deploy
          rsync -a --exclude='.github' . /tmp/deploy/
          cp /dev/shm/.env /tmp/deploy/.env

      - name: Delete existing app
        run: discloud app delete 1780863075904

      - name: Upload app
        working-directory: /tmp/deploy
        run: discloud app up

      - name: Check app status
        run: discloud app status 1780863075904

      - name: Shred .env
        if: always()
        run: shred -u /dev/shm/.env
