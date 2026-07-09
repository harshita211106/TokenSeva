import QRCode from "react-qr-code";

function QueueCard({
  queue,
  queueEmpty,
  handleNext,
}) {

  return (
    <div className="bg-white rounded-xl shadow-md p-6">

      <h3 className="text-2xl font-semibold mb-4">
        {queue.name}
      </h3>

      <p className="text-sm text-gray-600 mb-2 text-center">
        Scan to Join Queue
      </p>

      <div className="mt-6 flex justify-center">

        <QRCode
          value={`http://localhost:5173/queue/${queue._id}`}
        />

      </div>

      <div className="space-y-2 mb-4">

        <p className="text-gray-700">
          Current Token:
          A{100 + queue.currentToken}
        </p>

        <p className="text-gray-700">
          Serving:
          A{100 + queue.currentServingToken}
        </p>

      </div>

      <button
        className={`mt-2 px-5 py-2 rounded-lg text-white transition
        ${
          queueEmpty
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
        onClick={() => handleNext(queue._id)}
        disabled={queueEmpty}
      >

        {queueEmpty
          ? "Queue Empty"
          : "Next Token"}

      </button>

    </div>
  );
}

export default QueueCard;