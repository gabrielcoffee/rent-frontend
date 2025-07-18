export function translateAuthError(error: string, t: any): string {
    // Normalize the error message to lowercase for consistent matching
    const normalizedError = error.toLowerCase();

    // Map common Supabase error messages to translation keys
    if (normalizedError.includes('invalid login credentials') || 
        normalizedError.includes('invalid credentials')) {
        return t('auth.invalidCredentials');
    }

    if (normalizedError.includes('user not found')) {
        return t('auth.userNotFound');
    }

    if (normalizedError.includes('email already registered') || 
        normalizedError.includes('user already registered') ||
        normalizedError.includes('email already exists')) {
        return t('auth.emailAlreadyExists');
    }

    if (normalizedError.includes('password should be at least') ||
        normalizedError.includes('weak password') ||
        normalizedError.includes('password is too weak')) {
        return t('auth.weakPassword');
    }

    if (normalizedError.includes('email not confirmed') ||
        normalizedError.includes('confirmation required')) {
        return t('auth.emailNotConfirmed');
    }

    if (normalizedError.includes('too many requests') ||
        normalizedError.includes('rate limit')) {
        return t('auth.tooManyRequests');
    }

    if (normalizedError.includes('network') ||
        normalizedError.includes('connection') ||
        normalizedError.includes('fetch')) {
        return t('auth.networkError');
    }

    // If no specific translation found, return the original error
    return error;
} 