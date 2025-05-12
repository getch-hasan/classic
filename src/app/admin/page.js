"use client";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";

const Admin = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      category: "",
      id: "",
      arrival: "new",
      rating: { stars: "", reviews: "" },
      availability: "",
      price: "",
      description: "",
      colours: [{ name: "", hex: "", selected: false }],
      sizes: [""],
      selectedSize: "",
      quantity: 1,
      buyNowButton: true,
      wishlistButton: true,
      delivery: { type: "", note: "" },
      return: { type: "", note: "" },
      images: [],
      mainImage: null,
    },
  });

  const { fields: colorFields, append: appendColor, remove: removeColor } = useFieldArray({
    control,
    name: "colours",
  });

  const { fields: sizeFields, append: appendSize, remove: removeSize } = useFieldArray({
    control,
    name: "sizes",
  });

  const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
    control,
    name: "images",
  });

  const onSubmit = (data) => {
    console.log("hare is the product data=========>>>>>>>:", data);

    const formData = new FormData();
    for (const key in data) {
      if (key === "images") {
        data?.images?.forEach((file) => {
          if (file instanceof File) {
            formData.append("images", file);
          }
        });
      } else if (key === "mainImage") {
        if (data?.mainImage instanceof File) {
          formData.append("mainImage", data.mainImage);
        }
      } else {
        formData.append(key, JSON.stringify(data[key]));
      }
    }

    reset();
  };

  const inputStyle = "border p-2 w-full rounded-md";
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-md shadow-md">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">Add New Product</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" encType="multipart/form-data">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelStyle}>Product Name</label>
            <input {...register("name", { required: "Name is required" })} className={inputStyle} />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div>
            <label className={labelStyle}>Category</label>
            <input {...register("category", { required: "Category is required" })} className={inputStyle} />
            {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
          </div>
          <div>
            <label className={labelStyle}>Product ID</label>
            <input type="number" {...register("id", { required: "ID is required" })} className={inputStyle} />
            {errors.id && <p className="text-red-500 text-sm">{errors.id.message}</p>}
          </div>
          <div>
            <label className={labelStyle}>Availability</label>
            <input {...register("availability", { required: "Availability is required" })} className={inputStyle} />
            {errors.availability && <p className="text-red-500 text-sm">{errors.availability.message}</p>}
          </div>
        </div>

        {/* Rating & Price */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
  <label className={labelStyle}>Rating (Stars)</label>
  <input
    type="number"
    step="0.1"
    {...register("rating.stars", {
      required: "Rating stars are required",
      min: { value: 0, message: "Rating must be at least 0" },
      max: { value: 5, message: "Rating can't be more than 5" },
    })}
    className={inputStyle}
  />
  {errors.rating?.stars && (
    <p className="text-red-500 text-sm">{errors.rating.stars.message}</p>
  )}
</div>

          <div>
            <label className={labelStyle}>Rating (Reviews)</label>
            <input type="number" {...register("rating.reviews", {
              required: "Reviews required", min: 0,
            })} className={inputStyle} />
            {errors.rating?.reviews && <p className="text-red-500 text-sm">{errors.rating.reviews.message}</p>}
          </div>
          <div>
            <label className={labelStyle}>Price</label>
            <input type="number" step="0.01" {...register("price", {
              required: "Price is required", min: 0,
            })} className={inputStyle} />
            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className={labelStyle}>Description</label>
          <textarea {...register("description", { required: "Description is required" })} className={`${inputStyle} h-24`} />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        {/* Colors */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-blue-600">Colors</h3>
          {colorFields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-3 gap-4 items-center mb-2">
              <input {...register(`colours.${index}.name`, { required: true })} placeholder="Name" className={inputStyle} />
              <input {...register(`colours.${index}.hex`, { required: true })} placeholder="Hex" className={inputStyle} />
              <div className="flex items-center gap-2">
                <input type="checkbox" {...register(`colours.${index}.selected`)} />
                <button type="button" onClick={() => removeColor(index)} className="text-red-600 text-sm">Remove</button>
              </div>
            </div>
          ))}
          <button type="button" onClick={() => appendColor({ name: "", hex: "", selected: false })}
            className="mt-2 text-blue-600 hover:underline text-sm">+ Add Color</button>
        </div>

        {/* Sizes */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-blue-600">Sizes</h3>
          {sizeFields.map((field, index) => (
            <div key={field.id} className="flex gap-2 items-center mb-2">
              <input {...register(`sizes.${index}`, { required: true })} placeholder="Size" className={inputStyle} />
              <button type="button" onClick={() => removeSize(index)} className="text-red-600 text-sm">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => appendSize("")}
            className="mt-2 text-blue-600 hover:underline text-sm">+ Add Size</button>
        </div>

        {/* Selected Size & Quantity */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className={labelStyle}>Selected Size</label>
            <input {...register("selectedSize", { required: true })} className={inputStyle} />
          </div>
          <div>
            <label className={labelStyle}>Quantity</label>
            <input type="number" {...register("quantity", { required: true, min: 1 })} className={inputStyle} />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register("buyNowButton")} />
            <span>Buy Now Button</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register("wishlistButton")} />
            <span>Wishlist Button</span>
          </label>
        </div>

        {/* Delivery & Return */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelStyle}>Delivery Type</label>
            <input {...register("delivery.type", { required: true })} className={inputStyle} />
            <label className={labelStyle}>Delivery Note</label>
            <input {...register("delivery.note", { required: true })} className={inputStyle} />
          </div>
          <div>
            <label className={labelStyle}>Return Type</label>
            <input {...register("return.type", { required: true })} className={inputStyle} />
            <label className={labelStyle}>Return Note</label>
            <input {...register("return.note", { required: true })} className={inputStyle} />
          </div>
        </div>

        {/* Images */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-blue-600">Images</h3>
          {imageFields.map((field, index) => (
            <div key={field.id} className="flex gap-4 items-center mb-2">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const currentImages = getValues("images") || [];
                    const updatedImages = [...currentImages];
                    updatedImages[index] = file;
                    setValue("images", updatedImages);
                  }
                }}
                className="w-full"
              />
              <button type="button" onClick={() => removeImage(index)} className="text-red-600 text-sm">Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => appendImage("")}
            className="text-blue-600 hover:underline text-sm">+ Add Image</button>
        </div>

        {/* Main Image */}
        <div>
          <h3 className={labelStyle}>Main Image</h3>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setValue("mainImage", file);
            }}
            className="w-full"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow">
            Submit Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default Admin;
