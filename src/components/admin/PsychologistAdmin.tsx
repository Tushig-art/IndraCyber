import { useState } from 'react';
import { useData, PsychologistHour } from '../../contexts/DataContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Plus, Edit, Trash2, QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function PsychologistAdmin() {
  const { data, addItem, updateItem, deleteItem } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PsychologistHour | null>(null);
  const [showQR, setShowQR] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<PsychologistHour, 'id'>>({
    day: '',
    time: '',
    psychologist: '',
    qrCode: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updateItem('psychologistHours', editingItem.id, formData);
    } else {
      addItem('psychologistHours', {
        ...formData,
        id: Date.now().toString(),
      });
    }
    resetForm();
  };

  const handleEdit = (item: PsychologistHour) => {
    setEditingItem(item);
    setFormData(item);
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Устгахдаа итгэлтэй байна уу?')) {
      deleteItem('psychologistHours', id);
    }
  };

  const resetForm = () => {
    setFormData({
      day: '',
      time: '',
      psychologist: '',
      qrCode: '',
    });
    setEditingItem(null);
    setIsOpen(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Сэтгэлзүйчийн цаг удирдах</CardTitle>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingItem(null)}>
                <Plus className="w-4 h-4 mr-2" />
                Нэмэх
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingItem ? 'Засах' : 'Шинэ цаг нэмэх'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Өдрүүд</Label>
                  <Input
                    value={formData.day}
                    onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                    placeholder="Даваа - Баасан"
                    required
                  />
                </div>
                <div>
                  <Label>Цаг</Label>
                  <Input
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    placeholder="09:00-17:00"
                    required
                  />
                </div>
                <div>
                  <Label>Сэтгэлзүйч</Label>
                  <Input
                    value={formData.psychologist}
                    onChange={(e) => setFormData({ ...formData, psychologist: e.target.value })}
                    placeholder="М.Энхжаргал"
                    required
                  />
                </div>
                <div>
                  <Label>QR код линк</Label>
                  <Input
                    value={formData.qrCode}
                    onChange={(e) => setFormData({ ...formData, qrCode: e.target.value })}
                    placeholder="https://example.com/register"
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    {editingItem ? 'Хадгалах' : 'Нэмэх'}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Цуцлах
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Өдрүүд</TableHead>
              <TableHead>Цаг</TableHead>
              <TableHead>Сэтгэлзүйч</TableHead>
              <TableHead>QR код</TableHead>
              <TableHead className="text-right">Үйлдэл</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.psychologistHours.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.day}</TableCell>
                <TableCell>{item.time}</TableCell>
                <TableCell>{item.psychologist}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowQR(item.qrCode)}
                  >
                    <QrCode className="w-4 h-4 mr-2" />
                    Харах
                  </Button>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(item)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={!!showQR} onOpenChange={() => setShowQR(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>QR код</DialogTitle>
            </DialogHeader>
            <div className="flex justify-center p-4">
              {showQR && (
                <QRCodeSVG
                  value={showQR}
                  size={256}
                  level="H"
                  includeMargin={true}
                />
              )}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
