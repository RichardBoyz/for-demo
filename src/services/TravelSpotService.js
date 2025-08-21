import Parse from "parse";

class TravelSpotService {
  /**
   * 上傳旅遊景點到 Back4App。
   * @param {Object} data - 包含 title, description, image, creator 的物件。
   * @param {File} data.image - 從表單取得的 File 物件。
   * @returns {Promise<Parse.Object>} - 回傳儲存後的 Parse.Object。
   */
  async uploadTravelSpot({ title, description, image }) {
    if (!title || !description || !image) {
      throw new Error(
        "All fields (title, description, image, creator) are required."
      );
    }

    try {
      // 1. 建立一個 Parse.File 物件並儲存圖片
      const parseFile = new Parse.File(image.name, image);
      await parseFile.save();

      // 2. 建立一個 TravelSpot Parse.Object
      const TravelSpotClass = Parse.Object.extend("TravelSpot");
      const travelSpot = new TravelSpotClass();

      const currentUser = Parse.User.current();
      if (!currentUser) {
        throw new Error("請先登入才能上傳旅遊景點。");
      }

      // 3. 設定所有欄位
      travelSpot.set("title", title);
      travelSpot.set("description", description);
      travelSpot.set("image", parseFile);
      travelSpot.set("creator", currentUser);

      // 4. 儲存物件到 Back4App
      const result = await travelSpot.save();

      return result;
    } catch (error) {
      console.error("Error uploading travel spot:", error);
      throw new Error("Failed to upload travel spot. Please try again.");
    }
  }

  /**
   * 從 Back4App 讀取所有旅遊景點資料，並依照建立時間由新到舊排序。
   * @returns {Promise<Parse.Object[]>} - 回傳一個包含所有旅遊景點的陣列。
   */
  async getAllTravelSpots() {
    try {
      // 1. 建立一個查詢物件
      const query = new Parse.Query("TravelSpot");

      // 2. 依照建立時間 (createdAt) 由新到舊排序
      query.descending("createdAt");

      // 3. 包含 creator 的完整資料
      query.include("creator");

      // 4. 執行查詢
      const results = await query.find();

      // 5. 回傳結果
      const plainObjects = results.map((spot) => {
        const plainSpot = spot.toJSON();
        console.log(spot);

        // 注意：toJSON() 不會自動將關聯物件的詳細資料展開
        // 你需要手動處理 creator 物件
        if (spot.get("creator")) {
          plainSpot.creator = spot.get("creator").toJSON();
        }

        return plainSpot;
      });
      return plainObjects;
    } catch (error) {
      console.error("讀取旅遊景點時發生錯誤:", error);
      throw new Error("無法讀取旅遊景點資料，請稍後再試。");
    }
  }
}

export default new TravelSpotService();
