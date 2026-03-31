export interface LoginCredentials {
    username: string;
    password_hash?: string;
    password?: string;
}

export interface AuthResponse {
    token: string;
    user: {
        id: string;
        username: string;
    };
}
