"use client";
import TravelSpotService from "@/services/TravelSpotService";
import Parse from "parse";
import { useState } from "react";

const AddTravelSpot = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // 這裡需要取得當前登入的用戶
    // 假設您已經使用 Back4App 登入功能，可以透過 Parse.User.current() 取得
    const currentUser = Parse.User.current();

    if (!currentUser) {
      setError("Please log in to upload a travel spot.");
      setLoading(false);
      return;
    }

    try {
      const newSpot = await TravelSpotService.uploadTravelSpot({
        title,
        description,
        image,
      });

      setSuccess(`成功上傳旅遊景點！ID: ${newSpot.id}`);
      setTitle("");
      setDescription("");
      setImage(null);
      // 可選：重設檔案輸入欄位
      e.target.reset();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form
        className="flex flex-col gap-4 w-full max-w-md bg-form-bg p-8 rounded shadow"
        onSubmit={handleSubmit}
      >
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        <label className="flex flex-col gap-1 font-medium">
          標題
          <input
            type="text"
            className="border text-black rounded p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label className="flex text-black flex-col gap-1 font-medium">
          敘述
          <textarea
            className="border rounded p-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
          />
        </label>
        <label className="flex flex-col gap-1 font-medium">
          圖片上傳
          <input
            type="file"
            accept="image/*"
            className="border rounded p-2"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          送出
        </button>
      </form>
    </div>
  );
};

export default AddTravelSpot;
