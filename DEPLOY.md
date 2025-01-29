# Deploying to AWS EC2

## Prerequisites

1. An AWS account
2. Basic knowledge of AWS EC2 and SSH
3. A domain name (optional, but recommended)

## Step 1: Set Up EC2 Instance

1. Launch a new EC2 instance:
   - Choose Ubuntu Server 22.04 LTS
   - Select t2.micro (free tier eligible) or larger based on your needs
   - Configure Security Group:
     - Allow SSH (Port 22)
     - Allow HTTP (Port 80)
     - Allow HTTPS (Port 443)
   - Create and download your key pair

## Step 2: Connect to Your Instance

```bash
chmod 400 your-key-pair.pem
ssh -i your-key-pair.pem ubuntu@your-instance-ip
```

## Step 3: Install Dependencies

```bash
# Update system packages
sudo apt update
sudo apt upgrade -y

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PNPM
sudo npm install -g pnpm

# Install PM2 for process management
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx
```

## Step 4: Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/nuxtapp
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name 18.119.126.13;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/nuxtapp /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Step 5: Deploy Your Application

1. Clone your repository:

```bash
git clone your-repository-url
cd your-app-directory
```

2. Install dependencies and build:

```bash
pnpm install
pnpm run build
```

3. Start the application with PM2:

```bash
pm2 start .output/server/index.mjs --name "nuxtapp"
```

4. Ensure PM2 starts on system boot:

```bash
pm2 startup
pm2 save
```

## Step 6: SSL Configuration (Optional)

Install Certbot and obtain SSL certificate:

```bash
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
sudo certbot --nginx
```

## Maintenance

- Monitor logs: `pm2 logs nuxtapp`
- Restart application: `pm2 restart nuxtapp`
- View status: `pm2 status`
- Update application:
  ```bash
  git pull
  pnpm install
  pnpm run build
  pm2 restart nuxtapp
  ```

## Database Backup

Set up a cron job to backup your SQLite database:

```bash
# Create backup script
sudo nano /usr/local/bin/backup-db.sh
```

Add this content:

```bash
#!/bin/bash
BACKUP_DIR=/home/ubuntu/backups
APP_DIR=/home/ubuntu/your-app-directory

mkdir -p $BACKUP_DIR
cp $APP_DIR/data/messages.sqlite $BACKUP_DIR/messages_$(date +%Y%m%d_%H%M%S).sqlite

# Keep only last 7 days of backups
find $BACKUP_DIR -name "messages_*.sqlite" -mtime +7 -delete
```

Make the script executable and set up cron job:

```bash
sudo chmod +x /usr/local/bin/backup-db.sh
crontab -e
```

Add this line to run backup daily at 2 AM:

```
0 2 * * * /usr/local/bin/backup-db.sh
```

## Security Considerations

1. Keep your system updated:

```bash
sudo apt update && sudo apt upgrade -y
```

2. Configure UFW firewall:

```bash
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
sudo ufw enable
```

3. Regularly monitor logs for suspicious activity:

```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```
