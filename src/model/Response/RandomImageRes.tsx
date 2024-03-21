export interface RandomImageRes {
    random: Random[];
    limit:  number;
}

export interface Random {
    mid:   number;
    path:  string;
    name:  string;
    uid:   number;
    score: number;
}
