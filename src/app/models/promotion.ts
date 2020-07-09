export interface Promotion {
    readonly amount: 10;
    readonly type: 'free_spins' | 'free_credits';
    readonly game: string;
    readonly countdown: number;
}
