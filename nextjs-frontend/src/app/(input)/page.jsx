import InputForm from '@/components/InputForm';

export default function InputPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-16 lg:p-24 bg-gray-100">
      <div className="w-full max-w-7xl text-center mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800">
          QuizZum
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mt-2 mb-10">
          Don't feel dumb, use QuizZum
        </p>
        <InputForm />
      </div>
    </main>
  );
}
