"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useAuth } from "../../contexts/AuthContext"
import Navbar from "../../components/common/Navbar"
import Card, { CardBody, CardHeader } from "../../components/common/Card"
import Button from "../../components/common/Button"
import { User, Mail, Phone, MapPin, Camera, Save, DollarSign, CheckCircle } from "lucide-react"

const ProviderProfileEdit = () => {
  const { currentUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    avatar: "",
    bio: "",
    hourlyRate: 0,
    specialties: [] as string[],
    experience: "",
    certifications: [] as string[],
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false,
    },
  })

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || "",
        email: currentUser.email || "",
        phone: currentUser?.phone || "",
        location: currentUser?.location || "",
        avatar: currentUser?.avatar || "",
        bio: currentUser?.bio || "",
        hourlyRate: currentUser?.hourlyRate || 0,
        specialties: [],
        experience: "5+ años",
        certifications: [],
        availability: {
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
          saturday: false,
          sunday: false,
        },
      })
    }
  }, [currentUser])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setLoading(false)
  }

  const handleSpecialtyAdd = (specialty: string) => {
    if (specialty && !formData.specialties.includes(specialty)) {
      setFormData((prev) => ({
        ...prev,
        specialties: [...prev.specialties, specialty],
      }))
    }
  }

  const handleSpecialtyRemove = (specialty: string) => {
    setFormData((prev) => ({
      ...prev,
      specialties: prev.specialties.filter((s) => s !== specialty),
    }))
  }

  const handleAvailabilityChange = (day: string, available: boolean) => {
    setFormData((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: available,
      },
    }))
  }

  const commonSpecialties = [
    "Limpieza Residencial",
    "Limpieza Comercial",
    "Limpieza Profunda",
    "Instalación Eléctrica",
    "Reparación Eléctrica",
    "Sistemas Inteligentes",
    "Plomería Residencial",
    "Plomería Comercial",
    "Emergencias 24/7",
    "Diseño Interior",
    "Decoración",
    "Consultoría de Espacios",
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userType="provider" />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Editar Perfil</h1>
          <p className="text-gray-600 mt-1">Actualiza tu información profesional y configuración</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium text-gray-900">Información Personal</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="relative">
                    <img
                      src={
                        formData.avatar ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=random`
                      }
                      alt={formData.name}
                      className="h-20 w-20 rounded-full object-cover"
                    />
                    <button
                      type="button"
                      className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full hover:bg-blue-700 transition-colors"
                    >
                      <Camera size={16} />
                    </button>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-700">Foto de Perfil</p>
                    <p className="text-sm text-gray-500">JPG o PNG. Tamaño máximo de 1MB.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Nombre Completo
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                        className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Correo Electrónico
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Teléfono
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                        className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                      Ubicación
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                        className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                    Biografía Profesional
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="bio"
                      rows={4}
                      value={formData.bio}
                      onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
                      placeholder="Describe tu experiencia, habilidades y lo que te hace único como proveedor de servicios..."
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Professional Information */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium text-gray-900">Información Profesional</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700">
                      Tarifa por Hora ($)
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        id="hourlyRate"
                        value={formData.hourlyRate}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, hourlyRate: Number.parseInt(e.target.value) }))
                        }
                        className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                      Años de Experiencia
                    </label>
                    <select
                      id="experience"
                      value={formData.experience}
                      onChange={(e) => setFormData((prev) => ({ ...prev, experience: e.target.value }))}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="1-2 años">1-2 años</option>
                      <option value="3-5 años">3-5 años</option>
                      <option value="5+ años">5+ años</option>
                      <option value="10+ años">10+ años</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Especialidades</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                      >
                        {specialty}
                        <button
                          type="button"
                          onClick={() => handleSpecialtyRemove(specialty)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {commonSpecialties.map((specialty) => (
                      <button
                        key={specialty}
                        type="button"
                        onClick={() => handleSpecialtyAdd(specialty)}
                        disabled={formData.specialties.includes(specialty)}
                        className={`text-left px-3 py-2 text-sm rounded-md border ${
                          formData.specialties.includes(specialty)
                            ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {specialty}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Availability */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium text-gray-900">Disponibilidad</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">Selecciona los días en los que estás disponible para trabajar</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(formData.availability).map(([day, available]) => (
                    <div key={day} className="flex items-center">
                      <input
                        id={day}
                        type="checkbox"
                        checked={available}
                        onChange={(e) => handleAvailabilityChange(day, e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={day} className="ml-2 text-sm text-gray-700 capitalize">
                        {day === "monday" && "Lunes"}
                        {day === "tuesday" && "Martes"}
                        {day === "wednesday" && "Miércoles"}
                        {day === "thursday" && "Jueves"}
                        {day === "friday" && "Viernes"}
                        {day === "saturday" && "Sábado"}
                        {day === "sunday" && "Domingo"}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Verification Status */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium text-gray-900">Estado de Verificación</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-green-800">Perfil Verificado</p>
                      <p className="text-sm text-green-600">Tu perfil ha sido verificado por nuestro equipo</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm text-gray-700">Identidad Verificada</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm text-gray-700">Teléfono Verificado</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm text-gray-700">Email Verificado</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm text-gray-700">Antecedentes Verificados</span>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => window.history.back()}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary" isLoading={loading} className="flex items-center">
              <Save size={18} className="mr-2" />
              Guardar Cambios
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default ProviderProfileEdit
