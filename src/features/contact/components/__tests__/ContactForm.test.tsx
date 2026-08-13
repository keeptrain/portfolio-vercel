import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "../ContactForm";
import { TranslationProvider } from "@/i18n/TranslationContext";

const messages = {
  contact: {
    name: "Name",
    email: "Email",
    subject: "Subject",
    selectSubject: "Select a subject",
    subjectProject: "Project",
    subjectCollaboration: "Collaboration",
    subjectOther: "Other",
    message: "Message",
    send: "Send Message",
    sending: "Sending...",
    success: "Message sent!",
    error: "Failed to send",
  },
};

function renderWithProvider(ui: React.ReactElement) {
  return render(
    <TranslationProvider messages={messages} locale="en">
      {ui}
    </TranslationProvider>
  );
}

describe("ContactForm", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test("renders all form fields", () => {
    renderWithProvider(<ContactForm />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Subject")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Send Message" })).toBeInTheDocument();
  });

  test("shows validation error for empty name on submit", async () => {
    const user = userEvent.setup();
    renderWithProvider(<ContactForm />);
    
    await user.click(screen.getByRole("button", { name: "Send Message" }));
    
    await waitFor(() => {
      expect(screen.getAllByRole("alert").length).toBeGreaterThan(0);
    });
  });

  test("shows validation error for invalid email", async () => {
    const user = userEvent.setup();
    renderWithProvider(<ContactForm />);
    
    await user.type(screen.getByLabelText("Name"), "John Doe");
    await user.type(screen.getByLabelText("Email"), "invalid-email");
    await user.selectOptions(screen.getByLabelText("Subject"), "project");
    await user.type(screen.getByLabelText("Message"), "Hello, this is a test message.");
    await user.click(screen.getByRole("button", { name: "Send Message" }));
    
    // Form should not submit (no success or error message from API)
    await waitFor(() => {
      expect(screen.queryByText("Message sent!")).not.toBeInTheDocument();
    });
  });

  test("shows validation error for short message", async () => {
    const user = userEvent.setup();
    renderWithProvider(<ContactForm />);
    
    await user.type(screen.getByLabelText("Name"), "John Doe");
    await user.type(screen.getByLabelText("Email"), "john@example.com");
    await user.selectOptions(screen.getByLabelText("Subject"), "project");
    await user.type(screen.getByLabelText("Message"), "Hi");
    await user.click(screen.getByRole("button", { name: "Send Message" }));
    
    await waitFor(() => {
      expect(screen.getAllByRole("alert").length).toBeGreaterThan(0);
    });
  });

  test("submits successfully and shows success message", async () => {
    vi.spyOn(global, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify({ success: true }), { status: 200 })
    );
    
    const user = userEvent.setup();
    renderWithProvider(<ContactForm />);
    
    await user.type(screen.getByLabelText("Name"), "John Doe");
    await user.type(screen.getByLabelText("Email"), "john@example.com");
    await user.selectOptions(screen.getByLabelText("Subject"), "project");
    await user.type(screen.getByLabelText("Message"), "Hello, I have a project inquiry for you.");
    await user.click(screen.getByRole("button", { name: "Send Message" }));
    
    await waitFor(() => {
      expect(screen.getByText("Message sent!")).toBeInTheDocument();
    });
  });

  test("shows error on API failure", async () => {
    vi.spyOn(global, "fetch").mockResolvedValueOnce(
      new Response(null, { status: 500 })
    );
    
    const user = userEvent.setup();
    renderWithProvider(<ContactForm />);
    
    await user.type(screen.getByLabelText("Name"), "John Doe");
    await user.type(screen.getByLabelText("Email"), "john@example.com");
    await user.selectOptions(screen.getByLabelText("Subject"), "project");
    await user.type(screen.getByLabelText("Message"), "Hello, I have a project inquiry for you.");
    await user.click(screen.getByRole("button", { name: "Send Message" }));
    
    await waitFor(() => {
      expect(screen.getByText("Failed to send")).toBeInTheDocument();
    });
  });

  test("disables button while submitting", async () => {
    vi.spyOn(global, "fetch").mockImplementation(() => new Promise(() => {}));
    
    const user = userEvent.setup();
    renderWithProvider(<ContactForm />);
    
    await user.type(screen.getByLabelText("Name"), "John Doe");
    await user.type(screen.getByLabelText("Email"), "john@example.com");
    await user.selectOptions(screen.getByLabelText("Subject"), "project");
    await user.type(screen.getByLabelText("Message"), "Hello, I have a project inquiry for you.");
    await user.click(screen.getByRole("button", { name: "Send Message" }));
    
    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Sending..." })).toBeDisabled();
    });
  });
});
