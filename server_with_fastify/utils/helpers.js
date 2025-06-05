// pega as disciplinas cadastradas
export const getDisciplines = (result) => {
  var listResult = [];
  for (var i in result) {
    listResult.push(result[i].dataValues.discipline);
  }
  var listSet = new Set(listResult);
  var list = Array.from(listSet);
  //console.log("disciplinas", list);
  return list;
};

// pega os anos escolares cadastrados
export const getSchoolYear = (result) => {
  var listResult = [];
  for (var i in result) {
    listResult.push(result[i].dataValues.schoolYear);
  }
  var listSet = new Set(listResult);
  var list = Array.from(listSet);
  //console.log("ano escolar", list);
  return list;
};

// pega os assuntos cadastrados por disciplina
export const getSubjectsByDisciplines = (result, discipline) => {
  var listResult = [];
  for (var i in result) {
    if (result[i].dataValues.discipline == discipline) {
      listResult.push(result[i].dataValues.subject);
    }
  }
  console.log(`qtd subjects:, ${listResult.length} de ${discipline}`);
  var amountQuestions = listResult.length;
  var listSet = new Set(listResult);
  var listSubjects = Array.from(listSet);
  //console.log("assunto:", list);
  return { listSubjects, amountQuestions };
};

// pega a quantidade de perguntas por ano escolar
export const getAmountBySchoolYear = (result, schoolYear) => {
  var listResult = [];
  for (var i in result) {
    if (result[i].dataValues.schoolYear == schoolYear) {
      listResult.push(result[i].dataValues.subject);
    }
  }
  //console.log(`${listResult.length} de ${schoolYear}`);
  var amountQuestions = listResult.length;

  return amountQuestions;
};

// pega a quantidade de perguntas por ano escolar e disciplina
export const getAmountDisciplinesBySchoolYear = (
  result,
  disciplines,
  schoolYear
) => {
  var listResult = [];
  for (var i in result) {
    if (
      result[i].dataValues.schoolYear == schoolYear &&
      result[i].dataValues.discipline == disciplines
    ) {
      listResult.push(result[i].dataValues.discipline);
    }
  }
  var amountDisciplinesBySchoolYear = listResult.length;
  return amountDisciplinesBySchoolYear;
};

export const processData = (result) => {
  const disciplines = getDisciplines(result);
  const schoolYear = getSchoolYear(result);

  const subjectOfGeografia = getSubjectsByDisciplines(result, "Geografia");
  const subjectOfPortugues = getSubjectsByDisciplines(result, "Português");
  const subjectOfMatematica = getSubjectsByDisciplines(result, "Matemática");
  const subjectOfHistoria = getSubjectsByDisciplines(result, "História");
  const subjectOfCiencias = getSubjectsByDisciplines(result, "Ciências");

  const amount1ano = getAmountBySchoolYear(result, "1º Ano");
  const amount2ano = getAmountBySchoolYear(result, "2º Ano");
  const amount3ano = getAmountBySchoolYear(result, "3º Ano");
  const amount4ano = getAmountBySchoolYear(result, "4º Ano");
  const amount5ano = getAmountBySchoolYear(result, "5º Ano");
  const amount6ano = getAmountBySchoolYear(result, "6º Ano");
  const amount7ano = getAmountBySchoolYear(result, "7º Ano");
  const amount8ano = getAmountBySchoolYear(result, "8º Ano");
  const amount9ano = getAmountBySchoolYear(result, "9º Ano");

  const amountDisciplines1G = getAmountDisciplinesBySchoolYear(
    result,
    "Geografia",
    "1º Ano"
  );

  const amountDisciplines2G = getAmountDisciplinesBySchoolYear(
    result,
    "Geografia",
    "2º Ano"
  );

  const amountDisciplines3G = getAmountDisciplinesBySchoolYear(
    result,
    "Geografia",
    "3º Ano"
  );

  const amountDisciplines4G = getAmountDisciplinesBySchoolYear(
    result,
    "Geografia",
    "4º Ano"
  );

  const amountDisciplines5G = getAmountDisciplinesBySchoolYear(
    result,
    "Geografia",
    "5º Ano"
  );

  const amountDisciplines6G = getAmountDisciplinesBySchoolYear(
    result,
    "Geografia",
    "6º Ano"
  );

  const amountDisciplines7G = getAmountDisciplinesBySchoolYear(
    result,
    "Geografia",
    "7º Ano"
  );

  const amountDisciplines8G = getAmountDisciplinesBySchoolYear(
    result,
    "Geografia",
    "8º Ano"
  );

  const amountDisciplines9G = getAmountDisciplinesBySchoolYear(
    result,
    "Geografia",
    "9º Ano"
  );

  const amountDisciplines1P = getAmountDisciplinesBySchoolYear(
    result,
    "Português",
    "1º Ano"
  );

  const amountDisciplines2P = getAmountDisciplinesBySchoolYear(
    result,
    "Português",
    "2º Ano"
  );

  const amountDisciplines3P = getAmountDisciplinesBySchoolYear(
    result,
    "Português",
    "3º Ano"
  );

  const amountDisciplines4P = getAmountDisciplinesBySchoolYear(
    result,
    "Português",
    "4º Ano"
  );

  const amountDisciplines5P = getAmountDisciplinesBySchoolYear(
    result,
    "Português",
    "5º Ano"
  );

  const amountDisciplines6P = getAmountDisciplinesBySchoolYear(
    result,
    "Português",
    "6º Ano"
  );

  const amountDisciplines7P = getAmountDisciplinesBySchoolYear(
    result,
    "Português",
    "7º Ano"
  );

  const amountDisciplines8P = getAmountDisciplinesBySchoolYear(
    result,
    "Português",
    "8º Ano"
  );

  const amountDisciplines9P = getAmountDisciplinesBySchoolYear(
    result,
    "Português",
    "9º Ano"
  );

  const amountDisciplines1M = getAmountDisciplinesBySchoolYear(
    result,
    "Matemática",
    "1º Ano"
  );

  const amountDisciplines2M = getAmountDisciplinesBySchoolYear(
    result,
    "Matemática",
    "2º Ano"
  );

  const amountDisciplines3M = getAmountDisciplinesBySchoolYear(
    result,
    "Matemática",
    "3º Ano"
  );

  const amountDisciplines4M = getAmountDisciplinesBySchoolYear(
    result,
    "Matemática",
    "4º Ano"
  );

  const amountDisciplines5M = getAmountDisciplinesBySchoolYear(
    result,
    "Matemática",
    "5º Ano"
  );

  const amountDisciplines6M = getAmountDisciplinesBySchoolYear(
    result,
    "Matemática",
    "6º Ano"
  );

  const amountDisciplines7M = getAmountDisciplinesBySchoolYear(
    result,
    "Matemática",
    "7º Ano"
  );

  const amountDisciplines8M = getAmountDisciplinesBySchoolYear(
    result,
    "Matemática",
    "8º Ano"
  );

  const amountDisciplines9M = getAmountDisciplinesBySchoolYear(
    result,
    "Matemática",
    "9º Ano"
  );

  const amountDisciplines1H = getAmountDisciplinesBySchoolYear(
    result,
    "História",
    "1º Ano"
  );

  const amountDisciplines2H = getAmountDisciplinesBySchoolYear(
    result,
    "História",
    "2º Ano"
  );

  const amountDisciplines3H = getAmountDisciplinesBySchoolYear(
    result,
    "História",
    "3º Ano"
  );

  const amountDisciplines4H = getAmountDisciplinesBySchoolYear(
    result,
    "História",
    "4º Ano"
  );

  const amountDisciplines5H = getAmountDisciplinesBySchoolYear(
    result,
    "História",
    "5º Ano"
  );

  const amountDisciplines6H = getAmountDisciplinesBySchoolYear(
    result,
    "História",
    "6º Ano"
  );

  const amountDisciplines7H = getAmountDisciplinesBySchoolYear(
    result,
    "História",
    "7º Ano"
  );

  const amountDisciplines8H = getAmountDisciplinesBySchoolYear(
    result,
    "História",
    "8º Ano"
  );

  const amountDisciplines9H = getAmountDisciplinesBySchoolYear(
    result,
    "História",
    "9º Ano"
  );

  const amountDisciplines1C = getAmountDisciplinesBySchoolYear(
    result,
    "Ciências",
    "1º Ano"
  );

  const amountDisciplines2C = getAmountDisciplinesBySchoolYear(
    result,
    "Ciências",
    "2º Ano"
  );

  const amountDisciplines3C = getAmountDisciplinesBySchoolYear(
    result,
    "Ciências",
    "3º Ano"
  );

  const amountDisciplines4C = getAmountDisciplinesBySchoolYear(
    result,
    "Ciências",
    "4º Ano"
  );

  const amountDisciplines5C = getAmountDisciplinesBySchoolYear(
    result,
    "Ciências",
    "5º Ano"
  );

  const amountDisciplines6C = getAmountDisciplinesBySchoolYear(
    result,
    "Ciências",
    "6º Ano"
  );

  const amountDisciplines7C = getAmountDisciplinesBySchoolYear(
    result,
    "Ciências",
    "7º Ano"
  );

  const amountDisciplines8C = getAmountDisciplinesBySchoolYear(
    result,
    "Ciências",
    "8º Ano"
  );

  const amountDisciplines9C = getAmountDisciplinesBySchoolYear(
    result,
    "Ciências",
    "9º Ano"
  );

  return {
    disciplines,
    schoolYear,
    subjectOfGeografia,
    subjectOfPortugues,
    subjectOfMatematica,
    subjectOfHistoria,
    subjectOfCiencias,
    amount1ano,
    amount2ano,
    amount3ano,
    amount4ano,
    amount5ano,
    amount6ano,
    amount7ano,
    amount8ano,
    amount9ano,
    amountDisciplines1G,
    amountDisciplines2G,
    amountDisciplines3G,
    amountDisciplines4G,
    amountDisciplines5G,
    amountDisciplines6G,
    amountDisciplines7G,
    amountDisciplines8G,
    amountDisciplines9G,
    amountDisciplines1P,
    amountDisciplines2P,
    amountDisciplines3P,
    amountDisciplines4P,
    amountDisciplines5P,
    amountDisciplines6P,
    amountDisciplines7P,
    amountDisciplines8P,
    amountDisciplines9P,
    amountDisciplines1M,
    amountDisciplines2M,
    amountDisciplines3M,
    amountDisciplines4M,
    amountDisciplines5M,
    amountDisciplines6M,
    amountDisciplines7M,
    amountDisciplines8M,
    amountDisciplines9M,
    amountDisciplines1H,
    amountDisciplines2H,
    amountDisciplines3H,
    amountDisciplines4H,
    amountDisciplines5H,
    amountDisciplines6H,
    amountDisciplines7H,
    amountDisciplines8H,
    amountDisciplines9H,
    amountDisciplines1C,
    amountDisciplines2C,
    amountDisciplines3C,
    amountDisciplines4C,
    amountDisciplines5C,
    amountDisciplines6C,
    amountDisciplines7C,
    amountDisciplines8C,
    amountDisciplines9C,
  };
};
// Garantir que todas as funções, variáveis e propriedades relacionadas a 'discipline' estejam padronizadas e consistentes.
