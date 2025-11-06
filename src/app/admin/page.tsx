import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
  import { IndianRupee, ShoppingCart, Package } from 'lucide-react';
  
  export default function AdminDashboard() {
    const stats = [
      {
        title: 'Total Revenue',
        value: '₹1,25,430',
        icon: IndianRupee,
        change: '+20.1% from last month',
      },
      {
        title: 'Orders',
        value: '+1240',
        icon: ShoppingCart,
        change: '+180.1% from last month',
      },
      {
        title: 'Products',
        value: '12',
        icon: Package,
        change: 'Total active products',
      },
    ];
  
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>A log of recent store activities.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>No recent activity to display.</p>
            </CardContent>
        </Card>
      </div>
    );
  }
  