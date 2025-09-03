import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Activity, Aperture, Blinds, Calendar } from "lucide-react"

const AdminConnexion = () => {
  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      <div className="w-full md:w-1/3 flex bg-[#FAFCFB] justify-center items-center py-20 md:py-20">

        <div className="flex flex-col gap-6 md:gap-10 justify-center items-center">
          <div>
            <h1 className="text-4xl font-bold">Hello, Bienvenue</h1>
            <p className="text-xl">Accédez au tableau de bord ici</p>
          </div>
          <img src="/AdminConnexionImage.png" alt="" className="w-32 h-32 md:w-120 md:h-120 object-cover " />
          <div className="flex gap-5 justify-center items-center">
            <Activity />
            <Aperture />
            <Blinds />
            <Calendar />
          </div>
        </div>
      </div>
      <div className="w-full md:w-2/3 flex justify-center items-center">
        <Card className="w-full max-w-sm">

          <CardHeader>
            <CardTitle> Connectez-vous ! </CardTitle>
            <CardDescription> Entrez vos identifiants pour vous connencter </CardDescription>
          </CardHeader>

          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <label htmlFor="username">Nom d'utilisateur</label>
                  <Input placeholder="admin@gmmail.com" />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="password">Mot de passe</label>
                  <Input />
                </div>
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex-col gap-2">
            <Button className="w-full bg-[#3FB076] hover:bg-green-800">
              Connexion
            </Button>
          </CardFooter>

        </Card>
      </div>
    </div>
  )
}

export default AdminConnexion
