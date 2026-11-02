import { openDatabase, addToDatabase, findInDatabase, isInDatabase, PlayerRow } from '../../src/data/database';
import { describe, expect, test } from 'vitest';
import { rm } from 'node:fs/promises';
import * as path from 'node:path';

async function deleteFile(relativePath: string): Promise<void> {
  try {
    // Resolve the absolute path to your file
    const absolutePath = path.resolve(relativePath);

    // force: true prevents throwing an error if the file is already gone
    await rm(absolutePath, { force: true });
    console.log(`Successfully deleted: ${absolutePath}`);
  } catch (error) {
    console.error(`Error deleting file: `, error);
  }
}

const database = openDatabase('./tests/data/test_db.db');

describe('addToDatabase', () => {

    test('adds a player to the database if they do not exist', () => {
        expect(addToDatabase('Nicole', database)).toBe(1);
        const row_1 = findInDatabase('Nicole', database) as PlayerRow | undefined;
        expect(row_1?.name).toBe('Nicole');
        expect(row_1?.id).toBe(1);
        expect(addToDatabase('Nicky', database)).toBe(1);
        const row_2 = findInDatabase('Nicky', database) as PlayerRow | undefined;
        expect(row_2?.name).toBe('Nicky');
        expect(row_2?.id).toBe(2);
        expect(addToDatabase('Scott', database)).toBe(1);
        const row_3 = findInDatabase('Scott', database) as PlayerRow | undefined;
        expect(row_3?.name).toBe('Scott');
        expect(row_3?.id).toBe(3);
    })

    test('does not add a player that already exists', () => {
        expect(addToDatabase('Nicky', database)).toBe(0);
        const row_2 = findInDatabase('Nicky', database) as PlayerRow | undefined;
        expect(row_2?.name).toBe('Nicky');
        expect(row_2?.id).toBe(2);
        expect(addToDatabase('Scott', database)).toBe(0);
        const row_3 = findInDatabase('Scott', database) as PlayerRow | undefined;
        expect(row_3?.name).toBe('Scott');
        expect(row_3?.id).toBe(3);
        expect(addToDatabase('Nicole', database)).toBe(0);
        const row_1 = findInDatabase('Nicole', database) as PlayerRow | undefined;
        expect(row_1?.name).toBe('Nicole');
        expect(row_1?.id).toBe(1);
    })
})

describe('findInDatabase', () => {
    test('returns the row if the name exists in the database', () => {
        const row_2 = findInDatabase('Nicky', database) as PlayerRow | undefined;
        expect(row_2?.name).toBe('Nicky');
        expect(row_2?.id).toBe(2);
        const row_3 = findInDatabase('Scott', database) as PlayerRow | undefined;
        expect(row_3?.name).toBe('Scott');
        expect(row_3?.id).toBe(3);
    })

    test('returns undefined if the name does not exist in the database', () => {
        expect(findInDatabase('Michelle', database)).toBe(undefined);
        expect(findInDatabase('Max', database)).toBe(undefined);
        expect(findInDatabase('Lucy', database)).toBe(undefined);
    })
})

describe('isInDatabase', () => {
    test('return 1 if the name exists in the database', () => {
        expect(isInDatabase('Nicole', database)).toBe(true);
        expect(isInDatabase('Nicky', database)).toBe(true);
        expect(isInDatabase('Scott', database)).toBe(true);
    })
    test('return 0 if the name exists in the database', () => {
        expect(isInDatabase('Michelle', database)).toBe(false);
        expect(isInDatabase('Max', database)).toBe(false);
        expect(isInDatabase('Lucy', database)).toBe(false);
    })
})

deleteFile('./tests/data/test_db.db');