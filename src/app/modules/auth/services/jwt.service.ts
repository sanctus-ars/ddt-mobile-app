import {  default as jwtDecode } from 'jwt-decode';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class JwtService {
	private key: string = 'jwtToken';
	public schema: string = 'Bearer';

	public static decodeToken<T>(token: string): T {
		return jwtDecode(token) as T;
	}

	constructor() {	}

	public setToken(token: string): void {
		localStorage.setItem(this.key, token);
	}

	public removeToken(): void {
		localStorage.removeItem(this.key);
	}

	public getToken(): string {
		return localStorage.getItem(this.key);
	}
}
