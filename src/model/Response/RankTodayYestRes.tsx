export interface RankTodayYestRes {
    today:     Today[];
    yesterday: Yesterday[];
}

export interface Today {
    mid:    number;
    path:   string;
    name:   string;
    uid:    number;
    score:  number;
    result: string;
}

export interface Yesterday {
    mid:   number;
    path:  string;
    name:  string;
    uid:   number;
    score: number;
}
