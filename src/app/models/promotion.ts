export class Promotion {
    readonly amount: number;
    readonly type: string;
    readonly expiry: string;
    readonly ctaText: string;
    readonly game?: string;
    claimed: boolean;

    /**
     * By default the promotion \ bonus can be claimed
     * unless otherwise specified
     */
    // tslint:disable-next-line:variable-name
    private _canClaim = true;
    set canClaim(val: boolean) {
        this._canClaim = val;
    }
    get canClaim(): boolean {
        return !this.claimed && this._canClaim;
    }

    get expired(): boolean {
        const now = new Date();
        const nowMS = Date.parse(now.toUTCString());
        const expiryDate = new Date(this.expiry);
        const expiryMS = Date.parse(expiryDate.toUTCString());

        const remainingMs = expiryMS - nowMS;
        return remainingMs <= 0;
    }

    constructor(p: Promotion){
        Object.keys(p).forEach( k => {
            this[k] = p[k];
        });
    }
}
