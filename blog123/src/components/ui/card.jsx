import React from 'react';

export function Card({ children, className, ...props }) {
    return (
        <div className={`card ${className}`} {...props}>
            {children}
        </div>
    );
}

export function CardHeader({ children, className, ...props }) {
    return (
        <div className={`card-header ${className}`} {...props}>
            {children}
        </div>
    );
}

export function CardContent({ children, className, ...props }) {
    return (
        <div className={`card-content ${className}`} {...props}>
            {children}
        </div>
    );
}

export function CardTitle({ children, className, ...props }) {
    return (
        <h2 className={`card-title ${className}`} {...props}>
            {children}
        </h2>
    );
}