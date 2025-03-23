"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Label from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";


export default function AuctionPage() {
  const { register, handleSubmit, reset } = useForm();
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const onSubmit = (data: any) => {
    console.log("Auction Item:", data);
    reset();
    setPreviewImages([]);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files as FileList);
    const imagePreviews = files.map((file: File) => URL.createObjectURL(file));
    setPreviewImages(imagePreviews);
  };

  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <Card className="w-full max-w-md p-6 bg-white shadow-xl rounded-2xl">
          <CardContent>
            <h2 className="text-2xl font-bold text-center mb-4">Upload Auction Item</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="name">Item Name</Label>
                <Input id="name" {...register("name", { required: true })} placeholder="Enter item name" />
              </div>
              <div>
                <Label htmlFor="price">Price ($)</Label>
                <Input id="price" type="number" {...register("price", { required: true })} placeholder="Enter starting price" />
              </div>
              <div>
                <Label htmlFor="duration">Auction Duration (hours)</Label>
                <Input id="duration" type="number" {...register("duration", { required: true })} placeholder="Enter duration in hours" />
              </div>
              <div>
                <Label htmlFor="images">Upload Images</Label>
                <Input id="images" type="file" accept="image/png, image/jpg, image/jpeg" multiple onChange={handleImageChange} />
                <div className="flex flex-wrap gap-2 mt-2">
                  {previewImages.map((src, index) => (
                    <Image key={index} src={src} alt="Preview" width={80} height={80} className="rounded-lg" />
                  ))}
                </div>
              </div>
              <Button type="submit" className="w-full">Submit Item</Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </main>
  );
}