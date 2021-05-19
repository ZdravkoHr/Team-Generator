let peopleCount = getMembers().length;
const isInvalid = (count, length) => {
    return count > peopleCount || Math.floor(count) !== count || count < 0 || !count;
}

function createTeams(names, teamsCount, allowOddTeams) {
    names = names.map(i => i.trim()).filter(Boolean);
    peopleCount = getMembers().length;
    if (isInvalid(teamsCount, peopleCount)) return [];
    
    const teams = {};
    
    if (peopleCount % teamsCount === 0 || allowOddTeams == 'true') {
        let inWhichTeam = 0;
        for (let i = 1; i <= peopleCount; i++){
            let randomNum = ~~(Math.random() * names.length) + 0;
            let currentPerson = names[randomNum];
            inWhichTeam++;
            if (inWhichTeam > teamsCount) inWhichTeam = 1;
            let team = `team${inWhichTeam}`;
            if (!(Object.keys(teams).some(j => j === team))) {
                teams[team] = [];
            }
            teams[team].push(currentPerson);
            names.splice(randomNum, 1);
        }
    }
    
    else  {
        let inWhichTeam = 0;
        let loopTo = peopleCount - peopleCount % teamsCount;
        for (let i = 1; i <= loopTo; i++){
            let randomNum = ~~(Math.random() * names.length) + 0;
            let currentPerson = names[randomNum];
            inWhichTeam++;
            if (inWhichTeam > teamsCount) inWhichTeam = 1;
            let team = `team${inWhichTeam}`;
            if (!(Object.keys(teams).some(j => j === team))) {
                teams[team] = [];
            }
            teams[team].push(currentPerson);
            names.splice(randomNum, 1);
        }
    }
    return [teams, names];   
}
