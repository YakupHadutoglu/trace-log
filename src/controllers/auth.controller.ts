import { AuthService } from "../services/auth.service";
import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { COOKIE_OPTIONS } from "../config/cookie";
import { access } from "fs";

export const register = async (req: Request, res: Response) => {
    try {
        const { name, surname, email, password } = req.body;

        if (!name || !surname || !email || !password) return res.status(400).json({ message: "All fields are required." });

        const existingUser = await AuthService.findUserByEmail(email);
        if (existingUser) return res.status(409).json({ message: "User with this email already exists." });

        const user = await AuthService.createUser({ email, name, surname, password });

        return res.status(201).json({ ok: true, user });
    } catch (error) {
        console.error('Registration Error:', error);
        return res.status(500).json({ message: "Internal server error." });
    }

}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: "All fields are required." });

    const user = await AuthService.findUserByEmail(email);
    if (!user) return res.status(401).json({ message: "Invalid credentials." });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json('Invalid credentials.');

    const { access, refresh, csrf } = await AuthService.createSession(user.id, { name: user.name, surname: user.surname, email: user.email });

    res.cookie('refreshToken', refresh, COOKIE_OPTIONS);
    res.cookie('csrfToken', csrf, { ...COOKIE_OPTIONS, httpOnly: false });

    return res.json({ accessToken: access, user: { id: user.id, name: user.name, surname: user.surname, email: user.email } });
    } catch (error) {
        console.error('Login Error:', error);
        return res.status(500).json({ message: "Login Failed! Internal server error." });
    }

}

export const refresh = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies['refreshToken'];
        const csrfToken = req.headers['x-csrf-token'];

        if (!refreshToken || !csrfToken) return res.status(401).json({ message: "Unauthorized." });

        const newTokens = await AuthService.refreshSession(refreshToken, csrfToken as string);

        res.cookie('refreshToken', newTokens.refresh, COOKIE_OPTIONS);
        res.cookie('csrfToken', newTokens.csrf, { ...COOKIE_OPTIONS, httpOnly: false });

        return res.json({ accessToken: newTokens.access });

    } catch (error) {
        console.error('Refresh Error:', error);
        return res.status(403).json({ message: "Session invalid or expired." });
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies['refreshToken'];
        if (refreshToken) await AuthService.deleteSession(refreshToken);
        res.clearCookie('refreshToken', COOKIE_OPTIONS);
        res.clearCookie('csrfToken', { ...COOKIE_OPTIONS, httpOnly: false });

        return res.status(200).json({ message: "Loggeg out succesfully" });
    } catch (error) {
        console.error('Logout Error:', error);
        return res.status(500).json({ message: "Login Failed! Internal server error." });
    }
}
