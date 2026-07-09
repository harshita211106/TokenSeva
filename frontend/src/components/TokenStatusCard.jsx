function TokenStatusCard({
  joinedData,
  livePeopleAhead,
  liveEstimatedWait,
}) {

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-8">

      <h2 className="text-3xl font-bold text-blue-600 mb-4 text-center">
        Your Token: {joinedData.token}
      </h2>

      <div className="space-y-3 text-gray-700">

        <p className="text-lg">
          Position: {joinedData.position}
        </p>

        <p className="text-lg">
          People Ahead: {livePeopleAhead}
        </p>

        <p className="text-lg font-semibold text-orange-500">
          Estimated Wait: {liveEstimatedWait} mins
        </p>

        {livePeopleAhead === 0 && (
          <p className="text-green-600 font-bold text-xl mt-4 text-center">
            It's Your Turn!
          </p>
        )}

      </div>

    </div>
  );
}

export default TokenStatusCard;