
export default function addImgLoad (map,iconObj) {
    return new Promise((resolve, reject) => {
      map.loadImage(`${iconObj.iconPath}`, (error, img) => {
        if (img) {
          if (!map.hasImage(`${iconObj.iconName}`)) {
            map.addImage(`${iconObj.iconName}`, img);
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
