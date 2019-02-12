# BLADE-extension

### Building extension

Run the following commands to generate **zip** file, which you will publish to **Chrome Web Store**.

Download **Docker** for your platform. https://www.docker.com/get-started

Run following commands in terminal:
```sh
git clone https://github.com/AdBank/blade-extension.git
cd ./blade-extension
./build.sh
./run-daemon.sh
```

This will create **zip** file ready to deploy to **Chrome Web Store** and **devenv.chrome** folder ready to upload to **chrome://extensions/** in developer mode.

### Publish extension to Chrome Web Store

To upload your extesntion, sign in to the **Chrome Developer Dashboard** with appropriate account. https://chrome.google.com/webstore/developer/dashboard

Pay one-time developer registration fee US$5.00. ![registration fee](https://i.imgur.com/L4eODyp.png)

Once done, click **Add new item** and select generated **zip**. ![add new item](https://i.imgur.com/Sv51guF.png)

Fill the fields (description, screenshots, promotional tile images etc.) and click **Preview changes**. Make sure everything is correct and click **Publish**. ![publish changes](https://i.imgur.com/HWEsUhi.png)

The publishing process takes up to 3 days after that extension can be installed via **Chrome Web Store**.

### Updating extension

1.  Open https://chrome.google.com/webstore/developer/dashboard
2.  Click **edit** button ![alt text](https://i.imgur.com/jbkh7JF.png)
3.  Build extension for production
4.  Click **Upload Updated Package** ![alt text](https://i.imgur.com/sRYb8Kz.png)
5.  Publish changes

### Running UI development environment

Run the following commands in the ```bladeui``` directory :

* ```npm i```
* ```npm start```