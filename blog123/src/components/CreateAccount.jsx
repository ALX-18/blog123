import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card.jsx";
import { Input } from "./ui/input.jsx";
import { Button } from "./ui/button.jsx";

export default function CreateAccount() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-muted">
            <Card className="max-w-md w-full p-6">
                <CardHeader>
                    <CardTitle className="text-2xl text-center font-bold text-[#E03C31]">Créer un compte</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <Input type="text" placeholder="Nom d'utilisateur" />
                        <Input type="email" placeholder="Adresse e-mail" />
                        <Input type="password" placeholder="Mot de passe" />
                        <Button className="w-full bg-[#E03C31] text-white hover:bg-[#F6C54A] hover:text-[#E03C31]">
                            Créer un compte
                        </Button>
                    </form>
                    <p className="mt-4 text-center">
                        Vous avez déjà un compte ?{" "}
                        <Link to="/login" className="font-medium text-[#E03C31] hover:underline">
                            Connexion
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
