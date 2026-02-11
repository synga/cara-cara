import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Globe, Swords } from "lucide-react";

const gameModes = [
  {
    title: "Single Player",
    description: "Play against the computer. Guess the mystery character by asking about their traits!",
    icon: Users,
    available: true,
    route: "/play",
  },
  {
    title: "Online 1v1",
    description: "Challenge a friend online in real-time. Coming soon!",
    icon: Globe,
    available: false,
    route: "",
  },
  {
    title: "Tournament",
    description: "Compete in a bracket-style tournament with multiple players. Coming soon!",
    icon: Swords,
    available: false,
    route: "",
  },
];

export default function MainMenu() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      {/* Title */}
      <div className="text-center mb-10">
        <h1 className="text-5xl md:text-6xl font-bold font-display text-primary mb-3">
          Guess Who?
        </h1>
        <p className="text-lg text-muted-foreground font-body max-w-md mx-auto">
          The classic guessing game — pick a mode and start playing!
        </p>
      </div>

      {/* Mode cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
        {gameModes.map((mode) => (
          <Card
            key={mode.title}
            className={`transition-all duration-200 border-2 ${
              mode.available
                ? "hover:shadow-xl hover:border-primary cursor-pointer hover:scale-[1.03]"
                : "opacity-50 cursor-not-allowed"
            }`}
          >
            <CardHeader className="text-center pb-2">
              <div className="mx-auto mb-3 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <mode.icon className="w-7 h-7 text-primary" />
              </div>
              <CardTitle className="font-display text-xl">{mode.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <CardDescription className="mb-4 text-sm">{mode.description}</CardDescription>
              <Button
                className="w-full"
                disabled={!mode.available}
                onClick={() => mode.available && navigate(mode.route)}
              >
                {mode.available ? "Play Now" : "Coming Soon"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
