import { useState, useEffect } from "react";
import { Users as UsersIcon, Search, Shield, Activity, Plus, Edit2, Trash2, X } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/Table";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Skeleton } from "../components/ui/Skeleton";
import { useToast } from "../components/ui/Toast";
import { api } from "../services/api";

export function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { addToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", role: "user", jobType: "Delivery" });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await api.getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error("Failed to load users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await api.adminDeleteUser(userId);
      addToast({ title: "Deleted", description: "User deleted successfully", variant: "success" });
      fetchUsers();
    } catch (err) {
      addToast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const openModalForNew = () => {
    setEditingUser(null);
    setFormData({ name: "", email: "", role: "user", jobType: "Delivery" });
    setIsModalOpen(true);
  };

  const openModalForEdit = (user) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role === "Admin" ? "admin" : "user", jobType: user.jobType });
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await api.adminUpdateUser(editingUser.id, formData);
        addToast({ title: "Updated", description: "User details updated successfully", variant: "success" });
      } else {
        await api.adminAddUser({ ...formData, hasActivePlan: true });
        addToast({ title: "Added", description: "New user created successfully", variant: "success" });
      }
      setIsModalOpen(false);
      fetchUsers();
    } catch (err) {
      addToast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const filtered = users.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.id.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admin & User Management</h1>
        <p className="text-muted-foreground">Manage policyholders, investigate claims, and adjust parameters.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Active Policies</CardTitle>
            <UsersIcon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,450</div>
            <p className="text-xs text-muted-foreground">+340 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Premium Collected</CardTitle>
            <Shield className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹18.5M</div>
            <p className="text-xs text-muted-foreground">YTD revenue</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">99.9%</div>
            <p className="text-xs text-muted-foreground">API Triggers online</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start justify-between gap-4 pb-2">
          <div>
            <CardTitle>User Directory</CardTitle>
          </div>
          <div className="flex w-full sm:w-auto items-center space-x-2">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="text" 
                placeholder="Search users..."
                className="pl-8" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button onClick={openModalForNew} size="sm">
              <Plus className="mr-2 h-4 w-4" /> Add User
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? <Skeleton className="w-full h-[300px]" /> : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Username / Email</TableHead>
                  <TableHead>Job Role</TableHead>
                  <TableHead>Risk Profile</TableHead>
                  <TableHead>Premium</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(user => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Badge variant={user.risk === "High" ? "destructive" : user.risk === "Medium" ? "warning" : "default"}>
                        {user.risk}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.premium}</TableCell>
                    <TableCell>
                       <Badge variant={user.status === "Active" ? "success" : "secondary"}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => openModalForEdit(user)} className="h-8 w-8 text-muted-foreground hover:text-primary">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      {user.role !== "Admin" && (
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(user.id)} className="h-8 w-8 text-muted-foreground hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          {filtered.length === 0 && !loading && (
             <div className="text-center py-6 text-muted-foreground text-sm">No users found.</div>
          )}
        </CardContent>
      </Card>

      {/* CRUD Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <Card className="w-full max-w-md shadow-2xl relative">
            <button 
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
              onClick={() => setIsModalOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
            <CardHeader>
              <CardTitle>{editingUser ? "Edit User" : "Add New User"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleModalSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input 
                    type="text" 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})} 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Username / Email</label>
                  <Input 
                    type="text" 
                    value={formData.email} 
                    onChange={e => setFormData({...formData, email: e.target.value})} 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Role</label>
                  <select 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    value={formData.role}
                    onChange={e => setFormData({...formData, role: e.target.value})}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                {formData.role === "user" && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Job Category</label>
                    <select 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                      value={formData.jobType}
                      onChange={e => setFormData({...formData, jobType: e.target.value})}
                    >
                      <option value="Delivery">Delivery</option>
                      <option value="Ride-hailing">Ride-hailing</option>
                      <option value="Freelancer">Freelancer</option>
                    </select>
                  </div>
                )}
                <div className="pt-4 flex justify-end space-x-2">
                  <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                  <Button type="submit">{editingUser ? "Save Changes" : "Create User"}</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
