import { useEffect, useState, type FormEvent } from "react";
import { quizService, type Quiz } from "../../services/quizService";
import { tutorialService, type Tutorial } from "../../services/tutorialService";

interface QuestionForm {
  id?: string;
  question: string;
  options: string;
  correctAnswer: string;
  explanation: string;
  points: number;
}

const emptyQuestion = (): QuestionForm => ({
  question: "",
  options: "",
  correctAnswer: "",
  explanation: "",
  points: 1,
});

const ManageQuizzes = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    tutorial: "",
    title: "",
    description: "",
    passingScore: 70,
    timeLimit: 10,
  });
  const [questions, setQuestions] = useState<QuestionForm[]>([emptyQuestion()]);

  const loadData = async () => {
    const [quizData, tutorialData] = await Promise.all([
      quizService.getQuizzes({ page: 1, limit: 100 }),
      tutorialService.getTutorials({ page: 1, limit: 100 }),
    ]);
    setQuizzes(quizData.quizzes);
    setTutorials(tutorialData.tutorials);
    setForm((current) => ({ ...current, tutorial: current.tutorial || tutorialData.tutorials[0]?._id || "" }));
  };

  useEffect(() => {
    loadData().catch((error) => setMessage(error.message));
  }, []);

  const updateQuestion = (index: number, field: keyof QuestionForm, value: string | number) => {
    setQuestions((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, [field]: value } : item));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setMessage("");
    try {
      const quiz = editingId
        ? await quizService.updateQuiz(editingId, form)
        : await quizService.createQuiz({ ...form, published: true });
      for (const [index, question] of questions.entries()) {
        const options = question.options.split("\n").map((option) => option.trim()).filter(Boolean);
        if (options.length < 2 || !options.includes(question.correctAnswer.trim())) {
          throw new Error(`Question ${index + 1} needs at least two options and a matching correct answer.`);
        }
        const questionData = {
          question: question.question,
          type: "multiple-choice" as const,
          options,
          correctAnswer: question.correctAnswer.trim(),
          explanation: question.explanation,
          points: question.points,
          order: index + 1,
        };
        if (editingId && question.id) {
          await quizService.updateQuestion(quiz._id, question.id, questionData);
        } else {
          await quizService.createQuestion(quiz._id, questionData);
        }
      }
      setMessage(editingId ? "Quiz updated successfully." : "Quiz published successfully.");
      setShowForm(false);
      setEditingId(null);
      setQuestions([emptyQuestion()]);
      setForm({ tutorial: tutorials[0]?._id || "", title: "", description: "", passingScore: 70, timeLimit: 10 });
      await loadData();
    } catch (error: any) {
      setMessage(error.message || "Failed to publish quiz");
    }
  };

  const handleEdit = async (quiz: Quiz) => {
    setMessage("");
    try {
      const questionsData = await quizService.getQuizQuestions(quiz._id);
      setEditingId(quiz._id);
      setForm({
        tutorial: typeof quiz.tutorial === "object" ? quiz.tutorial._id : quiz.tutorial,
        title: quiz.title,
        description: quiz.description,
        passingScore: quiz.passingScore,
        timeLimit: quiz.timeLimit || 10,
      });
      setQuestions(questionsData.map((question) => ({
        id: question._id,
        question: question.question,
        options: question.options.join("\n"),
        correctAnswer: question.correctAnswer || "",
        explanation: question.explanation,
        points: question.points,
      })));
      setShowForm(true);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to load quiz for editing");
    }
  };

  const handleDelete = async (quiz: Quiz) => {
    if (!window.confirm(`Delete "${quiz.title}"? This action cannot be undone.`)) return;
    setDeletingId(quiz._id);
    setMessage("");
    try {
      await quizService.deleteQuiz(quiz._id);
      setMessage("Quiz deleted successfully.");
      await loadData();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to delete quiz");
    } finally {
      setDeletingId(null);
    }
  };

  const handleFormToggle = () => {
    setShowForm((current) => !current);
    setEditingId(null);
    setQuestions([emptyQuestion()]);
    setForm({ tutorial: tutorials[0]?._id || "", title: "", description: "", passingScore: 70, timeLimit: 10 });
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Administration</p>
          <h1 className="mt-1 text-2xl font-bold text-gray-900">Manage Quizzes</h1>
          <p className="mt-1 text-sm text-gray-500">Create quizzes and attach them to published tutorials.</p>
        </div>
        <button onClick={handleFormToggle} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
          {showForm ? "Close" : "+ New Quiz"}
        </button>
      </div>

      {message && <p className="mb-4 rounded-lg bg-blue-50 p-3 text-sm text-blue-700">{message}</p>}

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <input required placeholder="Quiz title" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className="rounded-lg border p-3" />
            <select required value={form.tutorial} onChange={(event) => setForm({ ...form, tutorial: event.target.value })} className="rounded-lg border p-3">
              <option value="">Select tutorial</option>
              {tutorials.map((tutorial) => <option key={tutorial._id} value={tutorial._id}>{tutorial.title}</option>)}
            </select>
            <textarea required placeholder="Quiz description" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} className="min-h-24 rounded-lg border p-3 md:col-span-2" />
            <label className="text-sm text-gray-600">Passing score (%)<input required type="number" min="0" max="100" value={form.passingScore} onChange={(event) => setForm({ ...form, passingScore: Number(event.target.value) })} className="mt-1 block w-full rounded-lg border p-3" /></label>
            <label className="text-sm text-gray-600">Time limit (minutes)<input required type="number" min="1" value={form.timeLimit} onChange={(event) => setForm({ ...form, timeLimit: Number(event.target.value) })} className="mt-1 block w-full rounded-lg border p-3" /></label>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between"><h2 className="font-semibold text-gray-900">Questions</h2><button type="button" onClick={() => setQuestions((current) => [...current, emptyQuestion()])} className="text-sm font-semibold text-blue-600 hover:underline">+ Add question</button></div>
            {questions.map((question, index) => (
              <div key={index} className="rounded-lg border border-gray-200 p-4">
                <div className="mb-3 flex items-center justify-between"><h3 className="font-medium text-gray-900">Question {index + 1}</h3>{questions.length > 1 && <button type="button" onClick={() => setQuestions((current) => current.filter((_, itemIndex) => itemIndex !== index))} className="text-sm text-red-600 hover:underline">Remove</button>}</div>
                <div className="grid gap-3 md:grid-cols-2">
                  <textarea required placeholder="Question text" value={question.question} onChange={(event) => updateQuestion(index, "question", event.target.value)} className="min-h-20 rounded-lg border p-3 md:col-span-2" />
                  <textarea required placeholder="Options, one per line" value={question.options} onChange={(event) => updateQuestion(index, "options", event.target.value)} className="min-h-24 rounded-lg border p-3" />
                  <input required placeholder="Correct answer (must match an option)" value={question.correctAnswer} onChange={(event) => updateQuestion(index, "correctAnswer", event.target.value)} className="rounded-lg border p-3" />
                  <input placeholder="Explanation" value={question.explanation} onChange={(event) => updateQuestion(index, "explanation", event.target.value)} className="rounded-lg border p-3" />
                  <input required type="number" min="1" placeholder="Points" value={question.points} onChange={(event) => updateQuestion(index, "points", Number(event.target.value))} className="rounded-lg border p-3" />
                </div>
              </div>
            ))}
          </div>
          <button type="submit" disabled={!form.tutorial || tutorials.length === 0} className="w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400">{editingId ? "Save Changes" : "Publish Quiz"}</button>
        </form>
      )}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full"><thead className="border-b border-gray-200 bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs uppercase text-gray-500">Title</th><th className="px-6 py-3 text-left text-xs uppercase text-gray-500">Tutorial</th><th className="px-6 py-3 text-left text-xs uppercase text-gray-500">Passing score</th><th className="px-6 py-3 text-left text-xs uppercase text-gray-500">Status</th><th className="px-6 py-3 text-right text-xs uppercase text-gray-500">Actions</th></tr></thead>
          <tbody className="divide-y divide-gray-200">{quizzes.map((quiz) => <tr key={quiz._id}><td className="px-6 py-4 text-sm font-medium text-gray-900">{quiz.title}</td><td className="px-6 py-4 text-sm text-gray-500">{typeof quiz.tutorial === "object" ? quiz.tutorial.title : quiz.tutorial}</td><td className="px-6 py-4 text-sm text-gray-500">{quiz.passingScore}%</td><td className="px-6 py-4 text-sm text-green-600">{quiz.published ? "Published" : "Draft"}</td><td className="px-6 py-4 text-right"><div className="flex justify-end gap-3"><button type="button" onClick={() => void handleEdit(quiz)} className="text-sm font-semibold text-blue-600 hover:underline">Edit</button><button type="button" onClick={() => void handleDelete(quiz)} disabled={deletingId === quiz._id} className="text-sm font-semibold text-red-600 hover:underline disabled:opacity-50">{deletingId === quiz._id ? "Deleting..." : "Delete"}</button></div></td></tr>)}</tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageQuizzes;
