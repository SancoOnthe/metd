"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Navbar from "../../components/common/Navbar"
import Card, { CardBody, CardHeader, CardFooter } from "../../components/common/Card"
import Button from "../../components/common/Button"
import { useAuth } from "../../contexts/AuthContext"
import { mockBookings, serviceListings, mockUsers } from "../../data/mockData"
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Star,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"

const BookingPage = () => {
  const { id } = useParams<{ id: string }>()
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const [booking, setBooking] = useState<any>(null)
  const [service, setService] = useState<any>(null)
  const [provider, setProvider] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      const bookingData = mockBookings.find((b) => b.id === id)
      if (bookingData) {
        setBooking(bookingData)

        const serviceData = serviceListings.find((s) => s.id === bookingData.serviceId)
        setService(serviceData)

        const providerData = mockUsers.find((u) => u.id === bookingData.providerId)
        setProvider(providerData)
      }
      setLoading(false)
    }, 800)
  }, [id])

  const handleCancelBooking = async () => {
    setActionLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setBooking((prev) => ({ ...prev, status: "canceled" }))
    setActionLoading(false)
  }

  const handleMessageProvider = () => {
    navigate("/client/messages")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "canceled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle size={20} className="text-blue-600" />
      case "completed":
        return <CheckCircle size={20} className="text-green-600" />
      case "pending":
        return <Clock size={20} className="text-yellow-600" />
      case "canceled":
        return <XCircle size={20} className="text-red-600" />
      default:
        return <AlertCircle size={20} className="text-gray-600" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar userType="client" />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar userType="client" />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Reserva no encontrada</h2>
            <p className="text-gray-600 mb-4">La reserva que buscas no existe o ha sido eliminada.</p>
            <Button variant="primary" onClick={() => navigate("/client")}>
              Volver al Dashboard
            </Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userType="client" />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <button onClick={() => navigate("/client")} className="text-blue-600 hover:text-blue-800 font-medium mb-2">
            ← Volver al dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Detalles de la Reserva</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Booking Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{service?.title}</h2>
                  <p className="text-gray-600 mt-1">ID de Reserva: #{booking.id}</p>
                </div>
                <div className="flex items-center">
                  {getStatusIcon(booking.status)}
                  <span
                    className={`ml-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}
                  >
                    {booking.status === "pending" && "Pendiente"}
                    {booking.status === "confirmed" && "Confirmada"}
                    {booking.status === "completed" && "Completada"}
                    {booking.status === "canceled" && "Cancelada"}
                  </span>
                </div>
              </CardHeader>
              <CardBody>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Información del Servicio</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Calendar size={16} className="text-gray-500 mr-2" />
                        <span className="text-gray-900">{booking.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock size={16} className="text-gray-500 mr-2" />
                        <span className="text-gray-900">{booking.time}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock size={16} className="text-gray-500 mr-2" />
                        <span className="text-gray-900">Duración: {booking.duration} horas</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Detalles del Precio</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Precio base:</span>
                        <span className="text-gray-900">${service?.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duración:</span>
                        <span className="text-gray-900">{booking.duration}h</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-semibold">
                        <span className="text-gray-900">Total:</span>
                        <span className="text-gray-900">${booking.totalPrice}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {booking.notes && (
                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Notas Adicionales</h3>
                    <p className="text-gray-600 bg-gray-50 p-3 rounded-md">{booking.notes}</p>
                  </div>
                )}
              </CardBody>
            </Card>

            {/* Service Details */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-medium text-gray-900">Detalles del Servicio</h2>
              </CardHeader>
              <CardBody>
                <div className="flex">
                  <img
                    src={service?.images[0] || "/placeholder.svg"}
                    alt={service?.title}
                    className="w-24 h-24 rounded-lg object-cover mr-4"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-gray-900 mb-2">{service?.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{service?.description}</p>
                    <div className="flex items-center">
                      <div className="flex items-center text-yellow-400 mr-3">
                        <Star size={16} className="fill-current" />
                        <span className="ml-1 text-sm font-medium text-gray-900">{service?.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">({service?.reviewCount} reseñas)</span>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Provider Info & Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <h2 className="text-lg font-medium text-gray-900">Proveedor del Servicio</h2>
              </CardHeader>
              <CardBody>
                <div className="flex items-center mb-4">
                  <img
                    src={provider?.avatar || "/placeholder.svg"}
                    alt={provider?.name}
                    className="w-12 h-12 rounded-full object-cover mr-3"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{provider?.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-gray-600">{provider?.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <MapPin size={16} className="text-gray-500 mr-2" />
                    <span className="text-gray-700 text-sm">{provider?.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone size={16} className="text-gray-500 mr-2" />
                    <span className="text-gray-700 text-sm">{provider?.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail size={16} className="text-gray-500 mr-2" />
                    <span className="text-gray-700 text-sm">{provider?.email}</span>
                  </div>
                </div>
              </CardBody>
              <CardFooter>
                <Button
                  variant="outline"
                  fullWidth
                  onClick={handleMessageProvider}
                  className="flex items-center justify-center"
                >
                  <MessageSquare size={18} className="mr-2" />
                  Enviar Mensaje
                </Button>
              </CardFooter>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-medium text-gray-900">Acciones</h2>
              </CardHeader>
              <CardBody className="space-y-3">
                {booking.status === "pending" && (
                  <Button variant="danger" fullWidth onClick={handleCancelBooking} isLoading={actionLoading}>
                    Cancelar Reserva
                  </Button>
                )}

                {booking.status === "completed" && (
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={() => {
                      /* Navigate to review page */
                    }}
                  >
                    Escribir Reseña
                  </Button>
                )}

                <Button variant="outline" fullWidth onClick={() => navigate(`/client/provider/${provider?.id}`)}>
                  Ver Perfil del Proveedor
                </Button>

                <Button variant="outline" fullWidth onClick={() => window.print()}>
                  Imprimir Detalles
                </Button>
              </CardBody>
            </Card>

            {/* Booking Timeline */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-medium text-gray-900">Estado de la Reserva</h2>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Reserva Creada</p>
                      <p className="text-xs text-gray-500">{new Date(booking.createdAt).toLocaleDateString("es-ES")}</p>
                    </div>
                  </div>

                  {booking.status !== "pending" && (
                    <div className="flex items-center">
                      <div
                        className={`w-3 h-3 rounded-full mr-3 ${
                          booking.status === "canceled" ? "bg-red-500" : "bg-green-500"
                        }`}
                      ></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {booking.status === "canceled" ? "Reserva Cancelada" : "Reserva Confirmada"}
                        </p>
                        <p className="text-xs text-gray-500">{new Date().toLocaleDateString("es-ES")}</p>
                      </div>
                    </div>
                  )}

                  {booking.status === "completed" && (
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Servicio Completado</p>
                        <p className="text-xs text-gray-500">{booking.date}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

export default BookingPage
