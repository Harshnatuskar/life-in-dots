//circles.ts
export interface Circle {
    id: string;
    filled: boolean;
    flicker?: boolean;
}

export function emptyCircles(rowsAndColumns: number): Circle[] {
    const circles: Circle[] = [];

    for (let row = 0; row < rowsAndColumns; row++) {
        for (let col = 0; col < rowsAndColumns; col++) {
            const id = `circle-${row}-${col}`;
            circles.push({ id, filled: false });
        }
    }

    return circles;
}
