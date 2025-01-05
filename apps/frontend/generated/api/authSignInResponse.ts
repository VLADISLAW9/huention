/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * Huention
 * OpenAPI spec version: 1.0
 */
import type { UserResponse } from './userResponse';

export interface AuthSignInResponse {
  /** Токен доступа */
  accessToken: string;
  /**
   * Error reason
   * @nullable
   */
  reason?: string | null;
  /** Request status */
  success: boolean;
  /** Пользователь */
  user: UserResponse;
}
