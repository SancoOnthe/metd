"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useAuth } from "../../contexts/AuthContext"
import Navbar from "../../components/common/Navbar"
import Card, { CardBody, CardFooter } from "../../components/common/Card"
import Button from "../../components/common/Button"
import { serviceListings, serviceCategories } from "../../data/mockData"
import { Plus, Edit, Trash2, Eye, Star, MapPin, DollarSign, Clock, ImageIcon } from "lucide-react"

const ProviderServices = () => {
  const { currentUser } = useAuth()
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingService, setEditingService] = useState<any>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: 0,
    priceType: "per hour",
    location: "",
    images: [] as string[],
    availableDays: [] as string[],
  })

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      const providerServices = serviceListings.filter((service) => service.providerId === currentUser?.id)
      setServices(providerServices)
      setLoading(false)
    }, 800)
  }, [currentUser])

  const handleAddService = () => {
    setEditingService(null)
    setFormData({
      title: "",
      description: "",
      category: "",
      price: 0,
      priceType: "per hour",
      location: currentUser?.location || "",
      images: [],
      availableDays: [],
    })
    setShowAddForm(true)
  }

  const handleEditService = (service: any) => {
    setEditingService(service)
    setFormData({
      title: service.title,
      description: service.description,
      category: service.category,
      price: service.price,
      priceType: service.priceType,
      location: service.location,
      images: service.images,
      availableDays: service.availableDays,
    })
    setShowAddForm(true)
  }

  const handleDeleteService = async (serviceId: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este servicio?")) {
      setServices((prev) => prev.filter((s) => s.id !== serviceId))
    }
  }

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault()

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (editingService) {
      // Update existing service
      setServices((prev) => prev.map((s) => (s.id === editingService.id ? { ...s, ...formData } : s)))
    } else {
      // Add new service
      const newService = {
        id: `service-${Date.now()}`,
        providerId: currentUser?.id,
        ...formData,
        rating: 0,
        reviewCount: 0,
        featured: false,
      }
      setServices((prev) => [...prev, newService])
    }

    setShowAddForm(false)
    setEditingService(null)
  }

  const getCategoryName = (categoryId: string) => {
    const category = serviceCategories.find((cat) => cat.id === categoryId)
    return category ? category.name : "Categoría Desconocida"
  }

  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  const weekDaysSpanish = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]

  const handleDayToggle = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      availableDays: prev.availableDays.includes(day)
        ? prev.availableDays.filter((d) => d !== day)
        : [...prev.availableDays, day],
    }))
  }

  if (showAddForm) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar userType="provider" />

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <button
              onClick={() => setShowAddForm(false)}
              className="text-blue-600 hover:text-blue-800 font-medium mb-2"
            >
              ← Volver a servicios
            </button>
            <h1 className="text-3xl font-bold text-gray-900">
              {editingService ? "Editar Servicio" : "Agregar Nuevo Servicio"}
            </h1>
          </div>

          <Card>
            <CardBody>
              <form onSubmit={handleSubmitForm} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Título del Servicio
                    </label>
                    <input
                      type="text"
                      id="title"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Ej: Limpieza profunda de hogar"
                    />
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                      Categoría
                    </label>
                    <select
                      id="category"
                      required
                      value={formData.category}
                      onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="">Seleccionar categoría</option>
                      {serviceCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                      Ubicación
                    </label>
                    <input
                      type="text"
                      id="location"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                      Precio
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        id="price"
                        required
                        min="0"
                        value={formData.price}
                        onChange={(e) => setFormData((prev) => ({ ...prev, price: Number.parseInt(e.target.value) }))}
                        className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="priceType" className="block text-sm font-medium text-gray-700">
                      Tipo de Precio
                    </label>
                    <select
                      id="priceType"
                      value={formData.priceType}
                      onChange={(e) => setFormData((prev) => ({ ...prev, priceType: e.target.value }))}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="per hour">Por hora</option>
                      <option value="per session">Por sesión</option>
                      <option value="per project">Por proyecto</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Descripción
                  </label>
                  <textarea
                    id="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Describe tu servicio en detalle..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Días Disponibles</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {weekDays.map((day, index) => (
                      <div key={day} className="flex items-center">
                        <input
                          id={day}
                          type="checkbox"
                          checked={formData.availableDays.includes(day)}
                          onChange={() => handleDayToggle(day)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor={day} className="ml-2 text-sm text-gray-700">
                          {weekDaysSpanish[index]}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" variant="primary">
                    {editingService ? "Actualizar Servicio" : "Crear Servicio"}
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userType="provider" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mis Servicios</h1>
            <p className="text-gray-600 mt-1">Gestiona tus servicios y ofertas</p>
          </div>
          <Button variant="primary" onClick={handleAddService} className="flex items-center">
            <Plus size={18} className="mr-2" />
            Agregar Servicio
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <CardBody>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                </CardBody>
              </Card>
            ))}
          </div>
        ) : services.length === 0 ? (
          <Card>
            <CardBody className="text-center py-12">
              <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
                <ImageIcon size={48} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tienes servicios aún</h3>
              <p className="text-gray-500 mb-6">
                Comienza agregando tu primer servicio para que los clientes puedan encontrarte.
              </p>
              <Button variant="primary" onClick={handleAddService} className="flex items-center mx-auto">
                <Plus size={18} className="mr-2" />
                Agregar Primer Servicio
              </Button>
            </CardBody>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card key={service.id} className="overflow-hidden">
                <div className="h-48 bg-gray-200 relative">
                  {service.images && service.images.length > 0 ? (
                    <img
                      src={service.images[0] || "/placeholder.svg"}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon size={48} className="text-gray-400" />
                    </div>
                  )}
                  {service.featured && (
                    <span className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Destacado
                    </span>
                  )}
                </div>

                <CardBody>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{service.title}</h3>
                  </div>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{service.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin size={14} className="mr-1" />
                      {service.location}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm">
                        <DollarSign size={14} className="text-green-600 mr-1" />
                        <span className="font-semibold text-gray-900">${service.price}</span>
                        <span className="text-gray-500 ml-1">
                          /
                          {service.priceType === "per hour"
                            ? "hora"
                            : service.priceType === "per session"
                              ? "sesión"
                              : "proyecto"}
                        </span>
                      </div>

                      {service.rating > 0 && (
                        <div className="flex items-center">
                          <Star size={14} className="text-yellow-400 fill-current mr-1" />
                          <span className="text-sm font-medium">{service.rating}</span>
                          <span className="text-sm text-gray-500 ml-1">({service.reviewCount})</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center text-sm text-gray-500">
                      <Clock size={14} className="mr-1" />
                      {service.availableDays.length} días disponibles
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {getCategoryName(service.category)}
                    </span>
                  </div>
                </CardBody>

                <CardFooter className="bg-gray-50 flex justify-between">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditService(service)}
                      className="flex items-center"
                    >
                      <Edit size={14} className="mr-1" />
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        /* View service details */
                      }}
                      className="flex items-center"
                    >
                      <Eye size={14} className="mr-1" />
                      Ver
                    </Button>
                  </div>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteService(service.id)}
                    className="flex items-center"
                  >
                    <Trash2 size={14} className="mr-1" />
                    Eliminar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default ProviderServices
