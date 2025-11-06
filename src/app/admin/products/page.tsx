import Image from 'next/image';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table';
  import { Badge } from '@/components/ui/badge';
  import { Button } from '@/components/ui/button';
  import { File, PlusCircle } from 'lucide-react';
  import { products } from '@/lib/products';
  import { PlaceHolderImages } from '@/lib/placeholder-images';
  
  export default function AdminProductsPage() {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Products</CardTitle>
            <CardDescription>Manage your store's products.</CardDescription>
          </div>
          <div className='flex gap-2'>
            <Button size="sm" variant="outline">
                <File className="h-4 w-4 mr-2" />
                Import CSV
            </Button>
            <Button size="sm">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                    Image
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Stock</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => {
                const productImage = PlaceHolderImages.find(p => p.id === product.images[0]);
                return (
                    <TableRow key={product.sku}>
                        <TableCell className="hidden sm:table-cell">
                        {productImage && 
                            <Image
                                alt={product.title}
                                className="aspect-square rounded-md object-cover"
                                height="64"
                                src={productImage.imageUrl}
                                width="64"
                                data-ai-hint={productImage.imageHint}
                            />
                        }
                        </TableCell>
                        <TableCell className="font-medium">{product.title}</TableCell>
                        <TableCell>
                            <Badge variant={product.stock_status === 'instock' ? 'outline' : 'destructive'}>
                                {product.stock_status === 'instock' ? 'In Stock' : 'Out of Stock'}
                            </Badge>
                        </TableCell>
                        <TableCell>₹{product.sale_price ?? product.price}</TableCell>
                        <TableCell className="text-right">{product.stock_qty}</TableCell>
                    </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }
  