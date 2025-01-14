import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card.jsx";
import { Input } from "./ui/input.jsx";
import { Button } from "./ui/button.jsx";

export default function ForgotPassword() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-muted">
            <Card className="max-w-md w-full p-6">
                <CardHeader>
                    <CardTitle className="text-2xl text-center font-bold text-[#E03C31]">Mot de passe oublié</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="mb-4 text-center text-muted-foreground">
                        Entrez votre adresse e-mail pour réinitialiser votre mot de passe.
                    </p>
                    <form className="space-y-4">
                        <Input type="email" placeholder="Votre adresse e-mail" />
                        <Button className="w-full bg-[#E03C31] text-white hover:bg-[#F6C54A] hover:text-[#E03C31]">
                            Réinitialiser le mot de passe
                        </Button>
                    </form>
                    <p className="mt-4 text-center">
                        <Link to="/login" className="text-sm font-medium text-[#E03C31] hover:underline">
                            Retour à la connexion
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
