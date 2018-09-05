class CvsReport {

  static getReport(test) {

    const relations = test.relations;
    let report = [];
    Object.entries(relations).forEach(([k, v]) => {
      let row;
      v.forEach(test => {
        if (test !== undefined) {
          row = {
            relation: k,
            status: test.status,
            reason: test.reason,
            url: test.url,
          }
          report.push(row);
        }
      });

    });
    return report;
  }
}

export default CvsReport;
