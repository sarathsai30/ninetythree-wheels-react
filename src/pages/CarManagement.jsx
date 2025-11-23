import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAdmin } from '../hooks/useAdmin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Pencil, Trash2, Plus, LogOut } from 'lucide-react';
import { toast } from 'sonner';

const CarManagement = () => {
  const [adminPassword, setAdminPassword] = useState('');
  const { isAdmin, login, logout } = useAdmin();
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [formData, setFormData] = useState({
    brand: '',
    name: '',
    price: '',
    image: '',
    description: '',
    features: [],
    specs: {},
    images: [],
  });

  useEffect(() => {
    if (isAdmin) {
      loadCars();
    }
  }, [isAdmin]);

  const loadCars = async () => {
    setIsLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'cars'));
      const carsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCars(carsData);
      toast.success(`Loaded ${carsData.length} cars`);
    } catch (error) {
      console.error('Error loading cars:', error);
      toast.error('Failed to load cars');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(adminPassword)) {
      setAdminPassword('');
      toast.success('Login successful');
    } else {
      toast.error('Invalid password');
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  const openAddDialog = () => {
    setEditingCar(null);
    setFormData({
      brand: '',
      name: '',
      price: '',
      image: '',
      description: '',
      features: [],
      specs: {},
      images: [],
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (car) => {
    setEditingCar(car);
    setFormData({
      brand: car.brand,
      name: car.name,
      price: car.price,
      image: car.image,
      description: car.description || '',
      features: car.features || [],
      specs: car.specs || {},
      images: car.images || [],
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingCar) {
        const carRef = doc(db, 'cars', editingCar.id);
        await updateDoc(carRef, {
          ...formData,
          updatedAt: new Date(),
        });
        toast.success('Car updated successfully');
      } else {
        await addDoc(collection(db, 'cars'), {
          ...formData,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        toast.success('Car added successfully');
      }
      
      setIsDialogOpen(false);
      loadCars();
    } catch (error) {
      console.error('Error saving car:', error);
      toast.error('Failed to save car');
    }
  };

  const handleDelete = async (carId, carName) => {
    if (!confirm(`Are you sure you want to delete ${carName}?`)) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'cars', carId));
      toast.success('Car deleted successfully');
      loadCars();
    } catch (error) {
      console.error('Error deleting car:', error);
      toast.error('Failed to delete car');
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field, value) => {
    const array = value.split('\n').filter(item => item.trim());
    setFormData(prev => ({ ...prev, [field]: array }));
  };

  const handleSpecsChange = (value) => {
    try {
      const specs = JSON.parse(value);
      setFormData(prev => ({ ...prev, specs }));
    } catch (error) {
      // Invalid JSON, ignore
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-full max-w-md p-8 bg-card rounded-lg shadow-lg border border-border">
          <h1 className="text-3xl font-bold mb-6 text-center text-foreground">
            Car Management Dashboard
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="password">Admin Password</Label>
              <Input
                id="password"
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Enter admin password"
                className="mt-2"
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Car Management Dashboard</h1>
            <p className="text-muted-foreground mt-2">Manage your car inventory</p>
          </div>
          <div className="flex gap-4">
            <Button onClick={loadCars} variant="outline" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Refresh'}
            </Button>
            <Button onClick={openAddDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Add Car
            </Button>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        <div className="bg-card rounded-lg shadow border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cars.length === 0 && !isLoading && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    No cars found. Add your first car to get started.
                  </TableCell>
                </TableRow>
              )}
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    Loading cars...
                  </TableCell>
                </TableRow>
              )}
              {cars.map((car) => (
                <TableRow key={car.id}>
                  <TableCell>
                    <img
                      src={car.image}
                      alt={car.name}
                      className="h-12 w-20 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{car.brand}</TableCell>
                  <TableCell>{car.name}</TableCell>
                  <TableCell>{car.price}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditDialog(car)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(car.id, car.name)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingCar ? 'Edit Car' : 'Add New Car'}
            </DialogTitle>
            <DialogDescription>
              {editingCar
                ? 'Update the car information below'
                : 'Fill in the details to add a new car'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="brand">Brand *</Label>
                <Input
                  id="brand"
                  value={formData.brand}
                  onChange={(e) => handleInputChange('brand', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder="₹10,00,000 - ₹15,00,000"
                  required
                />
              </div>
              <div>
                <Label htmlFor="image">Main Image URL *</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => handleInputChange('image', e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="features">Features (one per line)</Label>
              <Textarea
                id="features"
                value={formData.features?.join('\n') || ''}
                onChange={(e) => handleArrayChange('features', e.target.value)}
                rows={4}
                placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
              />
            </div>
            <div>
              <Label htmlFor="images">Additional Images URLs (one per line)</Label>
              <Textarea
                id="images"
                value={formData.images?.join('\n') || ''}
                onChange={(e) => handleArrayChange('images', e.target.value)}
                rows={4}
                placeholder="/path/to/image1.jpg&#10;/path/to/image2.jpg"
              />
            </div>
            <div>
              <Label htmlFor="specs">Specifications (JSON format)</Label>
              <Textarea
                id="specs"
                value={JSON.stringify(formData.specs, null, 2)}
                onChange={(e) => handleSpecsChange(e.target.value)}
                rows={6}
                placeholder='{"Engine": "1.5L", "Mileage": "18 kmpl"}'
                className="font-mono text-sm"
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editingCar ? 'Update Car' : 'Add Car'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CarManagement;
