/*
  rezervasyon modal
  otel tur ve yat için ortak rezervasyon akışı
  özet ve toplam fiyatı 
*/
import React, { useState } from 'react';
import { X, Calendar, Users, MapPin, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DateRangePicker, Calendar as CalendarComponent } from '@/components/ui/calendar';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCurrency } from '@/contexts/CurrencyContext';

export interface BookingItem {
  id: number;
  name: string;
  location: string;
  type: 'hotel' | 'tour' | 'yacht';
  basePrice: number;
  currency: string;
  imageUrl?: string;
  description?: string;
}

export interface BookingData {
  notes: string;
  guestCount?: number;
  participantCount?: number;
  checkInDate?: string;
  checkOutDate?: string;
  tourDate?: string;
  bookingDate?: string;
  startTime?: string;
  roomId?: number;
  totalPrice?: number;
  currency?: string;
  hotelId?: number;
  tourId?: number;
  yachtId?: number;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: BookingItem;
  onBookingSubmit: (bookingData: BookingData) => void;
}

export default function BookingModal({ isOpen, onClose, item, onBookingSubmit }: BookingModalProps) {
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();
  
  // farklı rezervasyon tipleri için state ler
  const [guestCount, setGuestCount] = useState(1);
  const [participantCount, setParticipantCount] = useState(1);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [tourDate, setTourDate] = useState<Date>();
  const [yachtDate, setYachtDate] = useState<Date>();
  const [yachtTime, setYachtTime] = useState('10:00');
  const [notes, setNotes] = useState('');
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  
  // oteller için oda
  const mockRooms = [
    { id: 1, name: t('standardRoom'), price: item.basePrice, maxOccupancy: 2 },
    { id: 2, name: t('deluxeRoom'), price: item.basePrice * 1.5, maxOccupancy: 2 },
    { id: 3, name: t('suite'), price: item.basePrice * 2, maxOccupancy: 4 },
  ];

  // rezervasyon verisi derle 
  const handleSubmit = () => {
    let bookingData: BookingData = {
      notes,
    };

    switch (item.type) {
      case 'hotel': {
        if (!startDate || !endDate || !selectedRoom) {
          alert(t('selectAllFields'));
          return;
        }
        const room = mockRooms.find(r => r.id === selectedRoom);
        const nights = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        bookingData = {
          ...bookingData,
          hotelId: item.id,
          roomId: selectedRoom,
          checkInDate: startDate.toISOString().split('T')[0],
          checkOutDate: endDate.toISOString().split('T')[0],
          guestCount,
          totalPrice: (room?.price || 0) * nights,
          currency: item.currency,
        };
        break;
        }
        
      case 'tour': {
        if (!tourDate || participantCount < 1) {
          alert(t('selectAllFields'));
          return;
        }
        bookingData = {
          ...bookingData,
          tourId: item.id,
          tourDate: tourDate.toISOString().split('T')[0],
          participantCount,
          totalPrice: item.basePrice * participantCount,
          currency: item.currency,
        };
        break;
        }
        
      case 'yacht': {
        if (!yachtDate || guestCount < 1) {
          alert(t('selectAllFields'));
          return;
        }
        bookingData = {
          ...bookingData,
          yachtId: item.id,
          bookingDate: yachtDate.toISOString().split('T')[0],
          startTime: yachtTime,
          guestCount,
          totalPrice: item.basePrice * guestCount,
          currency: item.currency,
        };
        break;
        }
    }

    onBookingSubmit(bookingData);
  };

  // toplam fiyat
  const calculateTotalPrice = () => {
    switch (item.type) {
      case 'hotel':
        if (startDate && endDate && selectedRoom) {
          const room = mockRooms.find(r => r.id === selectedRoom);
          const nights = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
          return (room?.price || 0) * nights;
        }
        return 0;
        
      case 'tour':
        return item.basePrice * participantCount;
        
      case 'yacht':
        return item.basePrice * guestCount;
        
      default:
        return 0;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* başlık */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div>
            <h2 className="text-2xl font-light text-white">{item.name}</h2>
            <div className="flex items-center gap-2 text-gray-400 mt-1">
              <MapPin className="w-4 h-4" />
              <span>{item.location}</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* rezervasyon formu */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* sol kolon form */}
            <div className="space-y-6">
              {item.type === 'hotel' && (
                <>
                  {/* tarih aralığı seçimi */}
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white text-lg flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-yellow-400" />
                        {t('dateSelection')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <DateRangePicker
                        startDate={startDate}
                        endDate={endDate}
                        onStartDateSelect={setStartDate}
                        onEndDateSelect={setEndDate}
                        className="w-full"
                      />
                    </CardContent>
                  </Card>

                  {/* oda seçimi */}
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">{t('roomSelection')}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {mockRooms.map((room) => (
                        <div
                          key={room.id}
                          onClick={() => setSelectedRoom(room.id)}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            selectedRoom === room.id
                              ? 'border-yellow-400 bg-yellow-400/10'
                              : 'border-gray-600 hover:border-gray-500'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="text-white font-medium">{room.name}</h4>
                              <p className="text-gray-400 text-sm">{t('maxPeople').replace('{count}', room.maxOccupancy.toString())}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-yellow-400 font-medium">
                                {formatPrice(room.price)} {t('perNight')}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* misafir sayısı */}
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white text-lg flex items-center gap-2">
                        <Users className="w-5 h-5 text-yellow-400" />
                        {t('guestCount')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                          disabled={guestCount <= 1}
                          className="border-gray-600 text-white hover:bg-gray-700"
                        >
                          -
                        </Button>
                        <span className="text-white text-lg font-medium min-w-[2rem] text-center">
                          {guestCount}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setGuestCount(guestCount + 1)}
                          disabled={guestCount >= 10}
                          className="border-gray-600 text-white hover:bg-gray-700"
                        >
                          +
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}

              {item.type === 'tour' && (
                <>
                
                 {/* tur tarihi */}
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white text-lg flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-yellow-400" />
                        {t('tourDate')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CalendarComponent
                        selectedDate={tourDate}
                        onDateSelect={setTourDate}
                        className="w-full"
                      />
                    </CardContent>
                  </Card>


                  {/* katılımcı sayısı */}
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white text-lg flex items-center gap-2">
                        <Users className="w-5 h-5 text-yellow-400" />
                        {t('participantCount')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setParticipantCount(Math.max(1, participantCount - 1))}
                          disabled={participantCount <= 1}
                          className="border-gray-600 text-white hover:bg-gray-700"
                        >
                          -
                        </Button>
                        <span className="text-white text-lg font-medium min-w-[2rem] text-center">
                          {participantCount}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setParticipantCount(participantCount + 1)}
                          disabled={participantCount >= 20}
                          className="border-gray-600 text-white hover:bg-gray-700"
                        >
                          +
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}

              {item.type === 'yacht' && (
                <>
                  {/* yat tarihi */}
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white text-lg flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-yellow-400" />
                        {t('yachtDate')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CalendarComponent
                        selectedDate={yachtDate}
                        onDateSelect={setYachtDate}
                        className="w-full"
                      />
                    </CardContent>
                  </Card>




                  {/* saat seçimi */}
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">{t('timeSelection')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <select
                        value={yachtTime}
                        onChange={(e) => setYachtTime(e.target.value)}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-yellow-400 focus:outline-none"
                      >
                        <option value="09:00">09:00</option>
                        <option value="10:00">10:00</option>
                        <option value="11:00">11:00</option>
                        <option value="12:00">12:00</option>
                        <option value="13:00">13:00</option>
                        <option value="14:00">14:00</option>
                        <option value="15:00">15:00</option>
                        <option value="16:00">16:00</option>
                      </select>
                    </CardContent>
                  </Card>

                  {/* misafir sayısı */}
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white text-lg flex items-center gap-2">
                        <Users className="w-5 h-5 text-yellow-400" />
                        {t('guestCount')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                          disabled={guestCount <= 1}
                          className="border-gray-600 text-white hover:bg-gray-700"
                        >
                          -
                        </Button>
                        <span className="text-white text-lg font-medium min-w-[2rem] text-center">
                          {guestCount}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setGuestCount(guestCount + 1)}
                          disabled={guestCount >= 20}
                          className="border-gray-600 text-white hover:bg-gray-700"
                        >
                          +
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}

            
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white text-lg">{t('specialRequests')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={t('bookingNotes')}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none resize-none"
                    rows={3}
                  />
                </CardContent>
              </Card>
            </div>

 
            <div className="space-y-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white text-lg flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-yellow-400" />
                    {t('bookingSummary')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">{item.name}</span>
                    <span className="text-white">{item.location}</span>
                  </div>
                  
                  {item.type === 'hotel' && startDate && endDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Konaklama</span>
                      <span className="text-white">
                        {startDate.toLocaleDateString('tr-TR')} - {endDate.toLocaleDateString('tr-TR')}
                      </span>
                    </div>
                  )}
                  
                  {item.type === 'tour' && tourDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tur Tarihi</span>
                      <span className="text-white">{tourDate.toLocaleDateString('tr-TR')}</span>
                    </div>
                  )}
                  
                  {item.type === 'yacht' && yachtDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Yat Tarihi</span>
                      <span className="text-white">{yachtDate.toLocaleDateString('tr-TR')} {yachtTime}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-gray-400">
                      {item.type === 'hotel' ? 'Misafir' : item.type === 'tour' ? 'Katılımcı' : 'Misafir'}
                    </span>
                    <span className="text-white">
                      {item.type === 'tour' ? participantCount : guestCount} kişi
                    </span>
                  </div>
                  
                  <hr className="border-gray-700" />
                  
                  <div className="flex justify-between text-lg font-medium">
                    <span className="text-white">{t('totalPrice')}</span>
                    <span className="text-yellow-400">{formatPrice(calculateTotalPrice())}</span>
                  </div>
                  
                  <Button
                    onClick={handleSubmit}
                    className="w-full bg-yellow-400 text-black hover:bg-yellow-300 font-medium py-3"
                  >
                    {t('makeReservation')}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
