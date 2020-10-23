
export default function addImgLoad (map,iconObj) {
    return new Promise((resolve, reject) => {
      map.loadImage(`${iconObj.iconPath}`, (error, img) => {
        if (img) {
          if (!map.hasImage(`${iconObj.iconPath}`)) {
            map.addImage(`${iconObj.iconPath}`, img);
          }
          resolve();
        }
        if (error) {
          resolve();
          console.log(error);
        }
      });
   });
}
