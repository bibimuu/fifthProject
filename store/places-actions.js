import * as FileSystem from "expo-file-system";

export const ADD_PLACE = "ADD_PLACE";

import { insertPlace } from "../helpers/db";

export const addPlace = (title, image) => {
  return async dispatch => {
    const fileName = image.split('/').pop();
    const a = image;
    const b = image.split('/');
    const newPath = FileSystem.documentDirectory + fileName;

    try{
      await FileSystem.moveAsync({
        from: image,
        to: newPath
      });
      const dbResult = await insertPlace(
        title,
        newPath,
        "Dummy address",
        12.2,
        16.6
      );
      console.log(dbResult,a,"aaaaa",b,fileName);
      dispatch({
        type: ADD_PLACE,
        placeData: { 
          id: dbResult.insertId,
          title: title,
          image: newPath
         }
      });
    } catch (e) {
      console.log(e);
      throw e;
    }


  };
};