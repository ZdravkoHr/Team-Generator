const isInvalid = (count, peopleCount) => {
	return (
		count > peopleCount || Math.floor(count) !== count || count < 0 || !count
	);
};

function createTeams({ members, teamCount, teamNames, allowOdd }) {
	members = members.map(i => i.trim()).filter(Boolean);
	const membersCopy = [...members];
	const membersCount = members.length;

	if (isInvalid(teamCount, membersCount)) return [];

	const teams = {};
	let teamIndex = 0;
	const stopIndex =
		allowOdd === 'true' ? null : membersCount - (membersCount % teamsCount);

	members.forEach((member, index) => {
		if (index === stopIndex) return;
		const randomNum = Math.floor(Math.random() * membersCopy.length);

		const teamName = teamNames[teamIndex] || 'Team' + (teamIndex + 1);
		teams[teamName] =
			teamName in teams
				? [...teams[teamName], members[randomNum]]
				: [members[randomNum]];
		membersCopy.splice(randomNum, 1);
		teamIndex = (teamIndex + 1) % teamCount;
	});

	return [teams, [...membersCopy]];
}
