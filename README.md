# BLADE-extension

### Building extension for production

Run the following commands to generate **zip** file, which you will publish to **Chrome Web Store**.

Download **Docker** for your platform. https://www.docker.com/get-started

Run following commands in terminal:
```sh
git clone https://github.com/AdBank/blade-extension.git
cd ./blade-extension
chmod u+x ./build.sh ./run.sh
./build.sh
./run.sh
```
This will create **zip** file ready to deploy to **Chrome Web Store**.

### Publish extension to Chrome Web Store

To upload your extesntion, sign in to the **Chrome Developer Dashboard** with appropriate account. https://chrome.google.com/webstore/developer/dashboard

Pay one-time developer registration fee US$5.00. (https://drive.google.com/open?id=1Tjt25QaWDSQZo-OzIhXYzH80-Y7XLL4T)

Once done, click **Add new item** and select generated **zip**. (https://drive.google.com/open?id=1LQXfwciQ5vUGf80qfQ_1Kz11KvFpBfra)

Fill the fields (description, screenshots, promotional tile images etc.) and click **Preview changes**. Make sure everything is correct and click **Publish**.

The publishing process takes up to 3 days after that extension can be installed via **Chrome Web Store**.

### Updating extension

1.  Open https://chrome.google.com/webstore/developer/dashboard
2.  Click **edit** button (https://i.imgur.com/jbkh7JF.png)
3.  Build extension for production
4.  Click **Upload Updated Package** (https://i.imgur.com/sRYb8Kz.png)
5.  Publish changes

### Running UI development environment

Run the following commands in the ```bladeui``` directory :

* ```npm i```
* ```npm start```

### Building Development Version of extension

Run the following commands in the root directory :

* ```npm i```
* ```npm run test-prod```