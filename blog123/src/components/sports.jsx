import React from 'react';
import { Link } from "react-router-dom";

export default function Sports() {
    const sports = [
        { 
            name: "Football", 
            description: "Le sport le plus populaire au monde", 
            image: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" className="w-full h-full">
                    <rect width="300" height="200" fill="#4CAF50"/>
                    <circle cx="150" cy="100" r="50" fill="white" stroke="black" strokeWidth="3"/>
                    <path d="M150 50 L175 90 L220 90 L185 115 L200 160 L150 135 L100 160 L115 115 L80 90 L125 90 Z" fill="black"/>
                </svg>
            )
        },
        { 
            name: "Rugby", 
            description: "Sport d'équipe avec un ballon ovale", 
            image: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" className="w-full h-full">
                    <rect width="300" height="200" fill="#8D6E63"/>
                    <ellipse cx="150" cy="100" rx="70" ry="40" fill="#5D4037" stroke="white" strokeWidth="3"/>
                    <line x1="80" y1="100" x2="220" y2="100" stroke="white" strokeWidth="3"/>
                    <line x1="150" y1="60" x2="150" y2="140" stroke="white" strokeWidth="3"/>
                </svg>
            )
        },
        { 
            name: "Tennis", 
            description: "Sport de raquette joué en simple ou en double", 
            image: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" className="w-full h-full">
                    <rect width="300" height="200" fill="#AED581"/>
                    <circle cx="150" cy="100" r="30" fill="#F9E54E" stroke="#FFFFFF" strokeWidth="2"/>
                    <ellipse cx="85" cy="100" rx="50" ry="25" fill="none" stroke="#333333" strokeWidth="3"/>
                    <line x1="85" y1="75" x2="85" y2="125" stroke="#333333" strokeWidth="3"/>
                    <line x1="35" y1="100" x2="135" y2="100" stroke="#333333" strokeWidth="3"/>
                    <rect x="135" y="95" width="30" height="10" fill="#8D6E63"/>
                </svg>
            )
        },
        { 
            name: "Natation", 
            description: "Sport aquatique avec plusieurs styles", 
            image: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" className="w-full h-full">
                    <rect width="300" height="200" fill="#03A9F4"/>
                    <path d="M50 100 Q75 70 100 100 Q125 130 150 100 Q175 70 200 100 Q225 130 250 100" 
                          fill="none" stroke="white" strokeWidth="3"/>
                    <circle cx="75" cy="70" r="15" fill="#FFC107"/>
                    <path d="M50 70 Q75 100 100 70" fill="none" stroke="#FFC107" strokeWidth="5"/>
                </svg>
            )
        },
        { 
            name: "Basket-ball", 
            description: "Sport rapide et dynamique", 
            image: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" className="w-full h-full">
                    <rect width="300" height="200" fill="#FF9800"/>
                    <circle cx="150" cy="100" r="50" fill="#E65100" stroke="black" strokeWidth="2"/>
                    <path d="M150 50 C100 70 100 130 150 150" fill="none" stroke="black" strokeWidth="2"/>
                    <path d="M150 50 C200 70 200 130 150 150" fill="none" stroke="black" strokeWidth="2"/>
                    <path d="M100 100 L200 100" stroke="black" strokeWidth="2"/>
                </svg>
            )
        },
        { 
            name: "Cyclisme", 
            description: "Sport d'endurance sur deux roues", 
            image: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" className="w-full h-full">
                    <rect width="300" height="200" fill="#BDBDBD"/>
                    <circle cx="100" cy="120" r="30" fill="none" stroke="black" strokeWidth="3"/>
                    <circle cx="200" cy="120" r="30" fill="none" stroke="black" strokeWidth="3"/>
                    <path d="M100 120 L150 80 L200 120" fill="none" stroke="black" strokeWidth="3"/>
                    <path d="M150 80 L130 120" fill="none" stroke="black" strokeWidth="3"/>
                    <rect x="140" y="60" width="20" height="20" fill="#E53935"/>
                </svg>
            )
        },
    ];

    return (
        <div className="flex min-h-screen flex-col">
            <header className="w-full border-b bg-white">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <Link to="/" className="text-2xl font-bold text-[#E03C31]">
                        BLOG123
                    </Link>
                    <nav className="flex space-x-6 text-sm font-medium">
                        <Link to="/entretiens" className="hover:text-[#E03C31]">Entretiens</Link>
                        <Link to="/articles" className="hover:text-[#E03C31]">Articles</Link>
                        <Link to="/sportif" className="hover:text-[#E03C31]">Sportif</Link>
                        <Link to="/apropos" className="hover:text-[#E03C31]">À propos de</Link>
                    </nav>
                    <Link to="/rapport" className="rounded bg-[#E03C31] px-4 py-2 text-white hover:bg-[#c0352b]">
                        Rapport
                    </Link>
                </div>
            </header>

            <main className="flex-1">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="mb-8 text-3xl font-bold">Derniers articles sportifs</h1>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {sports.map((sport, index) => (
                            <div key={index} className="bg-white rounded-md shadow overflow-hidden">
                                <div className="w-full h-48">
                                    {sport.image}
                                </div>
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold mb-2">{sport.name}</h2>
                                    <p className="text-gray-600 mb-4">{sport.description}</p>
                                    <Link 
                                        to={`/sport/${sport.name.toLowerCase()}`}
                                        className="text-[#E03C31] font-medium inline-flex items-center hover:underline"
                                    >
                                        Lire l'article 
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <footer className="w-full border-t py-6 bg-gray-50">
                <div className="container mx-auto px-4">
                    <p className="text-center text-sm text-gray-600">
                        © 2024 BLOG123. Tous droits réservés.
                    </p>
                </div>
            </footer>
        </div>
    );
}