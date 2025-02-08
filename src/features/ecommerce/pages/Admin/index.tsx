import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, Upload } from "lucide-react";
import { postRequest } from "../../../../shared/api";
import { CREATE_PRODUCT } from "../../constants/apiRoutes";
import { Card, CardContent } from "../../../todo-list/components/ui/card";
import { Input } from "../../../todo-list/components/ui/input";
import { handleMainImageUpload } from "../../utils/filehandlers/handleMainImageUpload";
import { Button } from "../../../todo-list/components/ui/button";
import { Textarea } from "../../../todo-list/components/ui/textarea";
import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { handleSubImagesUpload } from "../../utils/filehandlers/handleSubImagesUpload";

const CreateProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.string().min(1, "Price is required"),
  stock: z.string().min(1, "Stock quantity is required"),
  category: z.string().min(1, "Category is required"),
  mainImage: z.instanceof(File, { message: "Main image is required" }),
  subImages: z
    .array(z.instanceof(File))
    .min(1, "At least one sub-image is required")
    .max(4, "You can upload up to 4 sub-images only"),
});

type CreateProduct = z.infer<typeof CreateProductSchema>;

export default function AdminCreateProduct() {
  const [preview, setPreview] = useState({
    mainImage: "",
    subImages: [] as string[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CreateProduct>({
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      category: "649865ab297b287175aec1d7",
    },
  });

  const { watch, setValue } = form;

  const mainImage = watch("mainImage");
  const subImages = watch("subImages");

  useEffect(() => {
    return () => {
      if (preview.mainImage) URL.revokeObjectURL(preview.mainImage);
      preview.subImages.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [preview.mainImage, preview.subImages]);

  const onSubmit = async (data: CreateProduct) => {
    setIsSubmitting(true);
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "subImages") {
        value.forEach((file: File) => {
          formData.append(`subImages`, file);
        });
      } else if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    });

    try {
      const response = await postRequest(CREATE_PRODUCT, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Product created:", response);
    } catch (error) {
      console.error("Error creating product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Create New Product</CardTitle>
          <CardDescription>
            Add a new product to your e-commerce store.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product name" {...field} />
                    </FormControl>
                    <FormMessage name="name" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter product description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage name="description" />
                  </FormItem>
                )}
              />
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter price"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage name="price" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Stock</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter stock quantity"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage name="stock" />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="67a75a0381efa8b9fe53f417">
                          Category 1
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage name="category" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mainImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Main Image</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-4">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleMainImageUpload(e, setValue, setPreview)
                          }
                        />
                        {preview.mainImage && (
                          <img
                            src={preview.mainImage || "/placeholder.svg"}
                            alt="Preview"
                            className="h-20 w-20 object-cover rounded"
                          />
                        )}
                      </div>
                    </FormControl>
                    <FormMessage name="mainImage" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subImages"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sub Images</FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        <Input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) =>
                            handleSubImagesUpload(e, setValue, setPreview)
                          }
                        />
                        {preview.subImages.length > 0 && (
                          <div className="flex gap-2 flex-wrap">
                            {preview.subImages.map((url, index) => (
                              <img
                                key={index}
                                src={url || "/placeholder.svg"}
                                alt={`Preview ${index + 1}`}
                                className="h-20 w-20 object-cover rounded"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormDescription>
                      You can upload up to 4 sub-images.
                    </FormDescription>
                    <FormMessage name="subImages" />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Product
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Create Product
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
