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
  import { File } from 'lucide-react';
  
  const orders = [
    {
      orderId: 'ORD001',
      customer: 'Ravi Kumar',
      date: '2023-11-23',
      status: 'Fulfilled',
      total: '₹1250.00',
    },
    {
      orderId: 'ORD002',
      customer: 'Sunita Sharma',
      date: '2023-11-24',
      status: 'Pending',
      total: '₹850.50',
    },
    {
      orderId: 'ORD003',
      customer: 'Amit Patel',
      date: '2023-11-25',
      status: 'Fulfilled',
      total: '₹2400.00',
    },
    {
        orderId: 'ORD004',
        customer: 'Priya Singh',
        date: '2023-11-26',
        status: 'Cancelled',
        total: '₹450.00',
    },
  ];
  
  export default function AdminOrdersPage() {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Orders</CardTitle>
            <CardDescription>Manage your store's orders.</CardDescription>
          </div>
          <Button size="sm" variant="outline">
            <File className="h-4 w-4 mr-2" />
            Export
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.orderId}>
                  <TableCell className="font-medium">{order.orderId}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        order.status === 'Fulfilled' ? 'default' : order.status === 'Pending' ? 'secondary' : 'destructive'
                      }
                      className={
                        order.status === 'Fulfilled' ? 'bg-green-500/20 text-green-700' : 
                        order.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-700' : ''
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{order.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }
  